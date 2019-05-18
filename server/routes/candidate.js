const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/candidate"),
      userMiddlewares = require("../middlewares/user"),
      candidateMiddlewares = require("../middlewares/candidate");

router.route("/")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfOwner, helpers.getCandidates)
   .post(userMiddlewares.checkIfPerson, helpers.createCandidate)

router.route("/:id")
   .all(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfOwner)
   .get(helpers.getCandidate)
   // For now updating candidates is not acceptable
   //.patch(helpers.updateCandidate)
   .delete(helpers.deleteCandidate)

module.exports = router;