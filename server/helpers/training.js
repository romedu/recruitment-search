const {Training} = require("../models");

exports.createTraining = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newTraining   = await Training.create(req.body);

      currentUser.trainings.push(newTraining.id);
      await currentUser.save();

      res.status(201).json({newTraining});
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.deleteTraining = async (req, res, next) => {
   try {
      const {currentUser}  = req.locals,
            deletedTraining = await Training.findOneAndRemove({_id: req.params.id});

      currentUser.trainings.pull(deletedTraining.id);
      await currentUser.save();

      res.status(200).json({deletedTraining});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;