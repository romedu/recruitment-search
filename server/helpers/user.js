const {User} = require("../models"),
      {createError} = require("./error");

exports.findUser = async (req, res, next) => {
   try {
      const foundUser = await User.findById(req.params.userId)
                                  .populate("competences")
                                  .populate("languages")
                                  .populate("trainings")
                                  .populate("workingExperiences")
                                  .populate("positions")
                                  .populate("applications")
                                  .exec();

      if(!foundUser) throw createError(404, "Not Found");
      else {
         let {username, password, isCompany, ...userData} = foundUser;
         res.status(200).json({user: userData});
      }
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;