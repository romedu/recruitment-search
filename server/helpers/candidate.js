const {User, Candidate} = require("../models"),
      {createError}     = require("./error"),
      {createQueryObj}  = require("./utilities");

exports.getCandidates = async (req, res, next) => {
   try {
      const {page, limit, ...queryParams} = req.query,
            queryOptions = {
               page: page || 1, 
               limit: limit || 10
            },
            queryObject = createQueryObj(queryParams),
            candidates = await Candidate.paginate({...queryObject, position: req.params.positionId}, queryOptions);
      
      if(!candidates) throw createError(404, "Not Found");
      return res.status(200).json({candidates});
   }
   catch(error){
      next(error);
   }
}

exports.createCandidate = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newCandidate = await Candidate.create({...req.body, position: req.params.positionId, userData: currentUser._id});
      
      currentUser.applications.push(newCandidate.id);
      await currentUser.save();

      res.status(201).json({newCandidate});      
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.getCandidate = async (req, res, next) => {
   try {
      const foundCandidate = await Candidate.findById(req.params.id).populate("userData").populate("position").exec();

      if(!foundCandidate) throw createError(404, "Not Found");
      else {
         // Remove unnecessary/private userData
         const {username, password, isCompany, positions, applications, ...userData} = foundCandidate.userData._doc;
         foundCandidate.userData._doc = userData;
      }

      res.status(200).json({candidate: foundCandidate});
   }
   catch(error){
      next(error);
   }
}

exports.updateCandidate = async (req, res, next) => {
   try {
      const {currentCandidate} = req.locals;
      
      // Update the values from the properties passed in the request body
      for(property in req.body) currentCandidate[property] = req.body[property];
      await currentCandidate.save();
      
      res.status(200).json({updatedCandidate: currentCandidate});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deleteCandidate = async (req, res, next) => {
   try {
      const {currentUser, currentCandidate} = req.locals;

      let userApplying;

      if(currentUser.isCompany) userApplying = await User.findById(currentCandidate.userData);
      // Only the candidate itself can reach the following else block
      else userApplying = currentUser;

      userApplying.applications.pull(currentCandidate.id);
      await userApplying.save();
      await Candidate.findOneAndRemove({_id: req.params.id});
      
      res.status(200).json({deletedCandidate: currentCandidate});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;