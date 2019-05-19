const {Position, Candidate} = require("../models"),
      {createError} = require("../helpers/error");

exports.checkIfPosition = async (req, res, next) => {
   try {
      const currentPosition = await Position.findById(req.params.positionId);

      if(!currentPosition) throw createError(404, "Not Found");

      req.locals.currentPosition = currentPosition;
      next();
   }
   catch(error){
      next(error);
   }
}

// Check if the company is the owner of the position
exports.checkIfEmployer = async (req, res, next) => {
   try {
      const {currentUser, currentPosition} = req.locals;

      if(currentUser.id != currentPosition.company) throw createError(403, "Unauthorized");
      
      next();
   }
   catch(error){
      next(error);
   }
}

exports.checkIfOwner = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            currentCandidate = await Candidate.findById(req.params.id);
            
      if(!currentCandidate) throw createError(404, "Not Found");
      else if(currentUser.id != currentCandidate.userData) throw createError(403, "Unauthorized");
      
      req.locals.currentCandidate = currentCandidate;
      next();
   }
   catch(error) {
      next(error);
   }
}

// Only the position's owner or the candidate can proceed
exports.checkIfOwnerOrEmployer = async (req, res, next) => {
   try {
      const {currentUser} = req.locals;

      if(currentUser.isCompany){
         const currentPosition = await Position.findById(req.params.positionId);
         if(!currentPosition) throw createError(404, "Not Found");
         else if(currentUser.id != currentPosition.company) throw createError(403, "Unauthorized");
         next();
      }
      else {
         const currentCandidate = await Candidate.findById(req.params.id);
         if(!currentCandidate) throw createError(404, "Not Found");
         else if(currentUser.id != currentCandidate.userData) throw createError(403, "Unauthorized");
         req.locals.currentCandidate = currentCandidate;
         next();
      }
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;