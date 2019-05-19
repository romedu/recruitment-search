const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/candidate"),
      userMiddlewares = require("../middlewares/user"),
      candidateMiddlewares = require("../middlewares/candidate");

router.route("/")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfPosition, candidateMiddlewares.checkIfEmployer, helpers.getCandidates)
   .post(userMiddlewares.checkIfPerson, candidateMiddlewares.checkIfPosition, helpers.createCandidate)

router.route("/:id")
   .get(userMiddlewares.checkIfCompany, candidateMiddlewares.checkIfPosition, candidateMiddlewares.checkIfEmployer, helpers.getCandidate)
   .patch(userMiddlewares.checkIfPerson, candidateMiddlewares.checkIfOwner, helpers.updateCandidate)
   .delete(candidateMiddlewares.checkIfOwnerOrEmployer, helpers.deleteCandidate)

module.exports = router;