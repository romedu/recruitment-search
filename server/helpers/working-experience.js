const {WorkingExperience} = require("../models");

exports.createWorkingExperience = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newWorkingExperience   = await WorkingExperience.create(req.body);

      currentUser.workingExperiences.push(newWorkingExperience.id);
      await currentUser.save();

      res.status(201).json({newWorkingExperience});
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.deleteWorkingExperience = async (req, res, next) => {
   try {
      const {currentUser}  = req.locals,
            deletedWorkingExperience = await WorkingExperience.deleteOne({_id: req.params.id});

      currentUser.workingExperiences.pull(deletedWorkingExperience.id);
      await currentUser.save();

      res.status(200).json({deletedWorkingExperience});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;