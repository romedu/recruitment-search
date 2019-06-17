const fs = require("fs"),
      path = require("path"),
      {Employee} = require("../models"),
      {createError} = require("./error"),
      {createQueryObj} = require("./utilities");

exports.getEmployees = async (req, res, next) => {
   try {
      const {page, limit, ...queryParams} = req.query,
            queryOptions = {
               page: page || 1, 
               limit: limit || 10
            },
            queryObject = createQueryObj(queryParams),
            employees = await Employee.paginate({...queryObject, company: req.params.userId}, queryOptions);
            
      if(!employees) throw createError(404, "Not Found");
      return res.status(200).json({employees});
   }
   catch(error){
      next(error);
   }
}

exports.createEmployee = async (req, res, next) => {
   try {
      const {currentUser} = req.locals,
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
      for(let property in updateData) currentEmployee[property] = updateData[property];
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
      await Employee.findOneAndRemove({_id: req.params.id});
      res.status(200).json({deletedEmployee: currentEmployee});
   }
   catch(error){
      next(error);
   }
}

exports.downloadEmployeeData = (req, res, next) => {
   try {
      const {currentEmployee: {userData, position, department, monthlySalary, company}} = req.locals;
      
      let fileText = `
          Name: ${userData.name + "\n"}
          National ID: ${userData.nationalId + "\n"}
          Position: ${position + "\n"}
          Department: ${department + "\n"}
          Monthly Salary: ${monthlySalary + "\n"}
          Company Name: ${company.name}
         `;

      fs.writeFile("./assets/files/employee-download.txt", fileText, error => {
         if(error) throw new Error();
         res.download(path.join(__dirname, "../assets/files/employee-download.txt"));
      })
   }
   catch(error){
      next(error);
   }
}

module.exports = exports;