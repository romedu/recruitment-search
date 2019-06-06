const mongoose                    = require("mongoose"),
      {User, Position, Candidate} = require("../models"),
      {createError}               = require("./error"),
      {createQueryObj}            = require("./utilities");

exports.getPositions = async (req, res, next) => {
   try {
      const {page, limit, ...queryParams} = req.query,
            queryOptions = {
               page: page || 1, 
               limit: limit || 10
            },
            queryObject = createQueryObj(queryParams),
            positions = await Position.paginate(queryObject, queryOptions);

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
            newPosition   = await Position.create({...req.body, company: currentUser._id});

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
      const {currentPosition} = req.locals;
      
      // Update the values from the properties passed in the request body
      for(property in req.body) currentPosition[property] = req.body[property];
      await currentPosition.save();

      res.status(200).json({updatedPosition: currentPosition});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deletePosition = async (req, res, next) => {
   try {
      const {currentUser, currentPosition}  = req.locals,
            candidatesToDelete = await Candidate.find({position: currentPosition.id});

      // Pull the candiates from the users's applications property
      // Bandaid Fix
      candidatesToDelete.forEach(async (candidate, index) => {
         await User.updateOne({applications: mongoose.Types.ObjectId(candidate._id)}, {$pull: {applications: mongoose.Types.ObjectId(candidate._id)}});
      })

      await Position.findOneAndRemove({_id: currentPosition.id});
      // Delete all of the position's candidates
      await Candidate.deleteMany({position: currentPosition.id});
      
      currentUser.positions.pull(currentPosition.id);
      await currentUser.save();

      res.status(200).json({deletedPosition: currentPosition});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;