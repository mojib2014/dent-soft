const router = require("express").Router();
const googleAuthController = require("../../controllers/googleAuthController");

router.route("/")
  .get(googleAuthController.googleId);

module.exports = router;