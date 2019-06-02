const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/candidate"),
      userMiddlewares = require("../middlewares/user"),
      candidateMiddlewares = require("../middlewares/candidate");

router.route("/")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.getCurrentPosition, candidateMiddlewares.checkIfEmployer, helpers.getCandidates)
   .post(userMiddlewares.checkIfPerson, candidateMiddlewares.getCurrentPosition, helpers.createCandidate)

router.route("/:id")
   .get(candidateMiddlewares.getCurrentPosition, candidateMiddlewares.getCurrentCandidate, candidateMiddlewares.checkIfOwnerOrEmployer, helpers.getCandidate)
   .patch(userMiddlewares.checkIfPerson, candidateMiddlewares.getCurrentCandidate, candidateMiddlewares.checkIfOwner, helpers.updateCandidate)
   .delete(candidateMiddlewares.getCurrentPosition, candidateMiddlewares.getCurrentCandidate, candidateMiddlewares.checkIfOwnerOrEmployer, helpers.deleteCandidate)

module.exports = router;