const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/training");

router.post("/", helpers.createTraining);

router.delete("/:id", helpers.deleteTraining);

module.exports = router;