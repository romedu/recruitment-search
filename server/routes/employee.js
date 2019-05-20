const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/employee"),
      employeeMiddlewares = require("../middlewares/employee");

router.route("/")
   .get(helpers.getEmployees)
   .post(employeeMiddlewares.isUserDataValid, helpers.createEmployee)

router.route("/:id")
   .get(employeeMiddlewares.findEmployee, employeeMiddlewares.checkIfEmployer, helpers.getEmployee)
   .patch(employeeMiddlewares.findEmployee, employeeMiddlewares.checkIfEmployer, employeeMiddlewares.isUserDataValid, helpers.updateEmployee)
   .delete(employeeMiddlewares.findEmployee, employeeMiddlewares.checkIfEmployer, helpers.deleteEmployee)

module.exports = router;