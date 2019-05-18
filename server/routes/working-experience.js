const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/working-experience");

router.post("/", helpers.createWorkingExperience);

router.delete("/:id", helpers.deleteWorkingExperience);

module.exports = router;