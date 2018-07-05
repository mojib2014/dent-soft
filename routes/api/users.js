const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router
  .route("/google")
  .get(usersController.findAll)
  .post(usersController.findOneAndUpdateGoogle);

router
  .route("/signup")
  .get(usersController.findAll)
  .post(usersController.create);

router
  .route("/locallogin")
  .post(usersController.findByEmail);

router
  .route("/:email")
  .get(usersController.findByEmail);

router.route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
