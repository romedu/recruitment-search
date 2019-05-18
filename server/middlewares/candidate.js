const {Position} = require("../models"),
      {createError} = require("../helpers/error");

// Check if the company is the owner of the position
exports.checkIfOwner = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            currentPosition = await Position.findById(req.params.positionId);

      if(!currentPosition) throw createError(404, "Not Found");
      else if(currentUser.id != currentPosition.company) throw createError(403, "Unauthorized");

      next();
   }
   catch(error){
      next(error);
   }
}