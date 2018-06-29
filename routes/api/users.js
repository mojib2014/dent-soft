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
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
