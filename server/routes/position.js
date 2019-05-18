const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/position"),
      userMiddlewares = require("../middlewares/user"),
      positionMiddlewares = require("../middlewares/position");

router.route("/")
      .get(helpers.getPositions)
      .post(userMiddlewares.checkIfToken, userMiddlewares.checkIfCompany, helpers.createPosition)

router.route("/:id")
      .get(positionMiddlewares.getCurrentPosition, helpers.getPosition)
      .patch(userMiddlewares.checkIfToken, userMiddlewares.checkIfCompany, positionMiddlewares.getCurrentPosition, positionMiddlewares.checkIfOwner, helpers.updatePosition)
      .delete(userMiddlewares.checkIfToken, userMiddlewares.checkIfCompany, positionMiddlewares.getCurrentPosition, positionMiddlewares.checkIfOwner, helpers.deletePosition)

module.exports = router;