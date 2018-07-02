const router = require("express").Router();
const usersController = require("../../controllers/usersController");


router
  .route("/")
  .get(usersController.findAll)
  .post(usersController.findOneAndUpdate);

router
  .route("/:email")
  .get(usersController.findByEmail)

router.route("/:id")
  .get(usersController.findById)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
