const router  = require("express").Router(),
      helpers = require("../helpers/competence");

router.post("/", helpers.createCompetence);

router.route("/:competenceId")
      .patch(helpers.updateCompetence)
      .delete(helpers.deleteCompetence)

module.exports = router;