const {Position} = require("../models"),
      {createError} = require("../helpers/error");

exports.getCurrentPosition = async (req, res, next) => {
   try {
      const currentPosition = await Position.findById(req.params.id);

      if(!currentPosition) throw createError(404, "Not Found");
      if(!req.locals) req.locals = {};
      req.locals.currentPosition = currentPosition;
      next();
   }
   catch(error){
      next(error);
   }
}

exports.checkIfOwner = async (req, res, next) => {
   try {
      const {currentUser, currentPosition} = req.locals;
      if(currentUser.id == currentPosition.company) return next();
      throw createError(403, "Unauthorized");
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;