const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

router
  .route("/api/new-patient")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/:email")
  .get(usersController.findByEmail)
  
router.route("/api/new-patient")
  .get(usersController.findByEmail)
  .post(usersController.create);

router.route("/api/patient-login/:email")
  .get(usersController.findByEmail)


router.route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
