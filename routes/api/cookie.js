const router = require("express").Router();
const cookieController = require("../../controllers/cookieController");

router.route("/")
    .get(cookieController.getCookie)
    .post(cookieController.setCookie);

module.exports = router;