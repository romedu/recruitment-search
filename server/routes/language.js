const router = require("express").Router({mergeParams: true}),
      helpers = require("../helpers/language");

// Continue here
router.post("/", helpers.createLanguage);

router.route("/:id")
      .patch(helpers.updateLanguage)
      .delete(helpers.deleteLanguage)

module.exports = router;