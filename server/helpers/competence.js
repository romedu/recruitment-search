const {Competence}  = require("../models");

exports.createCompetence = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newCompetence = await Competence.create(req.body);
            
      currentUser.competences.push(newCompetence.id);
      await currentUser.save();
      
      return res.status(201).json({newCompetence});
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.updateCompetence = async (req, res, next) => {
   try {
      const updatedCompetence = await Competence.updateOne({id: req.params.id}, req.body, {new: true});
      return res.status(200).json({updateCompetence});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deleteCompetence = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            deletedCompetence = await Competence.deleteOne({_id: req.params.id});

      currentUser.competences.pull(deletedCompetence.id);
      await currentUser.save();

      return res.status(200).json({deleteCompetence});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;