const {Candidate} = require("../models"),
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
            newCandidate = await Candidate.create({...req.body, position: req.params.positionId, userData: currentUser.id});
      
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
         // Remove unnecessary userData
         const {username, password, isCompany, positions, ...userData} = foundCandidate.userData._doc;
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
      const deletedCandidate = await Candidate.deleteOne({_id: req.params.id});
      res.status(200).json({deletedCandidate});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;