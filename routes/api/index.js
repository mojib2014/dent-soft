const router = require("express").Router();

//auth
const googleAuthRoutes = require("./google_auth");

router.use("/googleclientid", googleAuthRoutes);

//new login route for local and google
const usersRoutes = require("./users");

router.use("/newlogin", usersRoutes);

// Admin routes
const adminRoutes = require("./admin")

router.use("/admin", adminRoutes);


const noteRoutes = require("./note");

// Note routes
router.use("/note", noteRoutes);


const recordsRoutes = require("./records");

// Records routes
router.use("/records", recordsRoutes);


const reservationRoutes = require("./reservation");

// Reservation routes
router.use("/reservation", reservationRoutes);


module.exports = router;