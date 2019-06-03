const jwt           = require("jsonwebtoken"),
      {SECRET_KEY}  = process.env,
      {createError} = require("../helpers/error"),
      {User}        = require("../models");

exports.checkIfToken = async (req, res, next) => {
   try {
      const token = req.get("Authorization"),
            currentUser = jwt.verify(token, SECRET_KEY);

      // If the currentUser is a company only populate the positions property, if not populate everything else
      req.locals = {};
      req.locals.currentUser = currentUser.isCompany ? await User.findById(currentUser.id)
                                                                 .populate("positions")
                                                                 .exec()
                                                     : await User.findById(currentUser.id)
                                                                 .populate("competences")
                                                                 .populate("languages")
                                                                 .populate("trainings")
                                                                 .populate("workingExperiences")
                                                                 .populate({
                                                                    path: "applications",
                                                                    populate: {
                                                                       path: "position"
                                                                    }
                                                                 })
                                                                 .exec();

      next();
   }
   catch(err){
      const error = createError(401, "Invalid token");
      next(error);
   }
}

exports.checkIfCompany = (req, res, next) => {
   if(req.locals.currentUser.isCompany) next();
   else {
      const error = createError(403, "Only companies are able to proceed");
      next(error);
   }
}

// Check if the user is not a company
exports.checkIfPerson = (req, res, next) => {
   if(!req.locals.currentUser.isCompany) next();
   else {
      const error = createError(403, "Companies are unable to proceed");
      next(error);
   }
}

exports.checkIfOwner = (req, res, next) => {
   const {currentUser} = req.locals;
   if(req.params.userId == currentUser.id) next();
   else {
      let error = createError(403, "Unauthorized");
      next(error);
   }
}

module.exports = exports;