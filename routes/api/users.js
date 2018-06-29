const router = require("express").Router();
const usersController = require("../../controllers/usersController");

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
