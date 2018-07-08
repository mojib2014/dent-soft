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
  .post(usersController.findByEmailLocalLogin);

router
  .route("/:email")
  .get(usersController.findByEmail);

// router.route("/:id")
//   .get(usersController.findById)
//   .put(usersController.update)
//   .delete(usersController.remove);

router
  .route("/photo")
  .post(usersController.updatePhoto);

router.route("/get/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);
  
router
  .route("/get/:id")
  .get(usersController.findById);

router
  .route("/post/:id")
  .post(usersController.update);

module.exports = router;
