const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

<<<<<<< HEAD
router
  .route("/api/new-patient")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/:email")
  .get(usersController.findByEmail)
=======
router.route("/api/new-patient")
  .get(usersController.findByEmail)
  .post(usersController.create);

router.route("/api/patient-login/:email")
  .get(usersController.findByEmail)


router.route("/:id")
  .get(usersController.findById)
>>>>>>> 971e96b73196c482efa7c98fe7938318d221aa6e
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
