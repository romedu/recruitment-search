const {Position}    = require("../models"),
      {createError} = require("./error");

exports.getPositions = async (req, res, next) => {
   try {
      const positions = await Position.find({});

      if(!positions) throw createError(404, "Not Found");

      res.status(200).json({positions});
   }
   catch(error){
      next(error);
   }
}

exports.createPosition = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newPosition   = await Position.create({...req.body, company: currentUser.id});

      console.log(currentUser);
      currentUser.positions.push(newPosition.id);
      await currentUser.save();

      res.status(201).json({newPosition});
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.getPosition = async (req, res, next) => {
   const {currentPosition} = req.locals;
   res.status(200).json({position: currentPosition});
}

exports.updatePosition = async (req, res, next) => {
   try {
      const positionToUpdate = await Position.findById(req.params.id);

      // Update the values from the properties passed in the request body
      for(property in req.body) positionToUpdate[property] = req.body[property];
      await positionToUpdate.save();

      res.status(200).json({updatedPosition: positionToUpdate});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deletePosition = async (req, res, next) => {
   try {
      const {currentUser, currentPosition}  = req.locals;

      await Position.deleteOne({_id: currentPosition.id});

      currentUser.positions.pull(currentPosition.id);
      await currentUser.save();

      res.status(200).json({deletedPosition: currentPosition});
   }
   catch(error){
      console.log(error);
      next(error);
   }
}

module.exports = exports;