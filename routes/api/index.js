const router = require("express").Router();
const adminRoutes = require("./admin");

// Admin routes
router.use("/admin", adminRoutes);

module.exports = router;

const noteRoutes = require("./note");

// Note routes
router.use("/note", noteRoutes);

module.exports = router;

const recordesRoutes = require("./recordes");

// Recordes routes
router.use("/recordes", recordesRoutes);

module.exports = router;

const reservationRoutes = require("./reservation");

// Reservation routes
router.use("/reservation", reservationRoutes);

module.exports = router;


const usersRoutes = require("./users");

// Users routes
router.use("/users", usersRoutes);

module.exports = router;