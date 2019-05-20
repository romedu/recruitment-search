const {Employee} = require("../models"),
      {createError} = require("./error");

exports.getEmployees = async (req, res, next) => {
   try {
      const employees = await Employee.find({company: req.params.userId});
      if(!employees) throw createError(404, "Not Found");
      return res.status(200).json({employees});
   }
   catch(error){
      next(error);
   }
}

exports.createEmployee = async (req, res, next) => {
   try {
      const {currentUser} = req.locals;
            newEmployee = await Employee.create({...req.body, company: currentUser._id});

      res.status(201).json({newEmployee});      
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.getEmployee = async (req, res, next) => {
   const {currentEmployee} = req.locals;
   res.status(200).json({employee: currentEmployee});
}

exports.updateEmployee = async (req, res, next) => {
   try {
      const {currentEmployee} = req.locals,
            {company, ...updateData} = req.body;

      // Update the values from the properties passed in the request body
      for(property in updateData) currentEmployee[property] = updateData[property];
      await currentEmployee.save();

      res.status(200).json({updatedEmployee: currentEmployee});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deleteEmployee = async (req, res, next) => {
   try {
      const {currentEmployee} = req.locals;
      await Employee.deleteOne({_id: req.params.id});
      res.status(200).json({deletedEmployee: currentEmployee});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;