const router  = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/competence");

router.post("/", helpers.createCompetence);

router.route("/:id")
      .patch(helpers.updateCompetence)
      .delete(helpers.deleteCompetence)

module.exports = router;