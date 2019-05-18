const router = require("express").Router(),
      helpers = require("../helpers/user");

router.get("/", helpers.findUser);

module.exports = router;