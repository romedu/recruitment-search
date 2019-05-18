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
      const currentUser = req.locals,
            newEmployee = await Employee.create({...req.body, company: currentUser.id});
      
      res.status(201).json({newEmployee});      
   }
   catch(error){
      error.status = 400;
      next(error);
   }
}

exports.getEmployee = async (req, res, next) => {
   try {
      const foundEmployee = await Employee.findById(req.params.id);

      if(!foundEmployee) throw createError(404, "Not Found");

      res.status(200).json({employee: foundEmployee});
   }
   catch(error){
      next(error);
   }
}

exports.updateEmployee = async (req, res, next) => {
   try {
      const updatedEmployee = await Employee.updateOne({id: req.params.id});
      res.status(200).json({updatedEmployee});
   }
   catch(error){
      error.status = 409;
      next(error);
   }
}

exports.deleteEmployee = async (req, res, next) => {
   try {
      const deletedEmployee = await Employee.deleteOne({_id: req.params.id});
      res.status(200).json({deletedEmployee});
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;