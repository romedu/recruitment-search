const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/candidate"),
      userMiddlewares = require("../middlewares/user"),
      candidateMiddlewares = require("../middlewares/candidate");

router.route("/")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfEmployer, helpers.getCandidates)
   .post(userMiddlewares.checkIfPerson, helpers.createCandidate)

router.route("/:id")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfEmployer, helpers.getCandidate)
   .patch(userMiddlewares.checkIfPerson, candidateMiddlewares.checkIfOwner, helpers.updateCandidate)
   .delete(helpers.deleteCandidate)

module.exports = router;