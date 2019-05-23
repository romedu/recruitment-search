const {User, Candidate} = require("../models"),
      {createError} = require("./error");

exports.getCandidates = async (req, res, next) => {
   try {
      const candidates = await Candidate.find({position: req.params.positionId});
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
      const foundCandidate = await Candidate.findById(req.params.id).populate("userData").exec();

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
      const {currentUser} = req.locals;

      let userApplying,
          deletedCandidate;

      if(currentUser.isCompany){
         deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
         userApplying = await User.findById(deletedCandidate.userData);
      }
      else {
         // Because of the middlewares only the candidate itself can get here
         // that's why the current user is the one applying
         userApplying = currentUser;
         deletedCandidate = req.locals.currentCandidate;
         await Candidate.findOneAndRemove({_id: req.params.id});
      }

      userApplying.applications.pull(deletedCandidate.id);
      await userApplying.save();
      
      res.status(200).json({deletedCandidate});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;