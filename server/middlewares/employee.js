const {User, Employee} = require("../models"),
      {createError} = require("../helpers/error");

// The user data must reference an existing person
exports.isUserDataValid = async (req, res, next) => {
   try {
      if(!req.body.userData) return next();

      const personToEmploy = await User.findById(req.body.userData);
      if(!personToEmploy) throw createError(404, "Not Found");
      else if(personToEmploy.isCompany) throw createError(403, "Companies can't be employed");
      next();
   }
   catch(error){
      next(error);
   }
}

exports.findEmployee = async (req, res, next) => {
   try { 
      const foundEmployee = await Employee.findById(req.params.id).populate("userData").exec();

      if(!foundEmployee) throw createError(404, "Not Found");

      // Remove unnecessary/private userData
      const {username, password, isCompany, positions, applications, ...userData} = foundEmployee.userData._doc;
      foundEmployee.userData._doc = userData;

      req.locals.currentEmployee = foundEmployee;
      next()
   }
   catch(error) {
      next(error);
   }
}

exports.checkIfEmployer = async (req, res, next) => {
   try { 
      const {currentEmployee} = req.locals;
      if(req.params.userId != currentEmployee.company) throw createError(403, "Unauthorized");
      next()
   }
   catch(error) {
      next(error);
   }
}

module.exports = exports;