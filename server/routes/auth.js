const router = require("express").Router(),
      helpers = require("../helpers/auth"),
      userMiddlewares = require("../middlewares/user");

router.get("/verifyToken", userMiddlewares.checkIfToken, helpers.verifyToken);

router.post("/register", helpers.register);

router.post("/login", helpers.login);

module.exports = router;