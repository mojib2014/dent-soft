const router = require("express").Router();
const recordesController = require("../../controllers/recordesController");

// Matches with "/api/books"
router.route("/")
  .get(recordesController.findAll)
  .post(recordesController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(recordesController.findById)
  .put(recordesController.update)
  .delete(recordesController.remove);

module.exports = router;
