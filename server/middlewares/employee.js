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
      const foundEmployee = await Employee.findById(req.params.id).populate("userData").populate("company").exec();

      if(!foundEmployee) throw createError(404, "Not Found");

      // Remove unnecessary/private userData
      const employeeData = extractUserData(foundEmployee.userData._doc),
            companyData = extractUserData(foundEmployee.company._doc);
      
      foundEmployee.userData._doc = employeeData;
      foundEmployee.company._doc = companyData;

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
      if(req.params.userId != currentEmployee.company._id) throw createError(403, "Unauthorized");
      next()
   }
   catch(error) {
      next(error);
   }
}

const extractUserData = user => {
   const {username, password, isCompany, positions, applications, ...userData} = user;
   return userData;
}

module.exports = exports;