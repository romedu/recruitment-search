const router = require("express").Router(),
      helpers = require("../helpers/employee");

router.route("/")
   .get(helpers.getEmployees)
   .post(helpers.createEmployee)

router.route("/:id")
   .get(helpers.getEmployee)
   .patch(helpers.updateEmployee)
   .delete(helpers.deleteEmployee)

module.exports = router;