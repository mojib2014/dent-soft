const router = require("express").Router();
const recordsController = require("../../controllers/recordsController");

// Matches with "/api/books"
router.route("/")
  .get(recordsController.findAll)
  .post(recordsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(recordsController.findById)
  .put(recordsController.update)
  .delete(recordsController.remove);

module.exports = router;
