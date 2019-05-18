const {Language} = require("../models");

exports.createLanguage = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
            newLanguage   = await Language.create(req.body);

      currentUser.languages.push(newLanguage.id);
      await currentUser.save();

      res.status(201).json({newLanguage});
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.updateLanguage = async (req, res, next) => {
   try {
      const updatedLanguage = await Language.updateOne({id: req.params.id}, req.body, {new: true});
      res.status(200).json({updatedLanguage});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deleteLanguage = async (req, res, next) => {
   try {
      const {currentUser}  = req.locals,
            deletedLanguage = await Language.deleteOne({_id: req.params.id});

      currentUser.languages.pull(deletedLanguage.id);
      await currentUser.save();

      res.status(200).json({deletedLanguage});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;