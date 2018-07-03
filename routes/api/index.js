const router = require("express").Router();

//auth
const googleAuthRoutes = require("./google_auth");

router.use("/googleclientid", googleAuthRoutes);

//sign up, new login route for local and google
const userRoutes = require("./users");

router.use("/user", userRoutes);

// const cookieRoutes = require("./cookie");

// router.use("/cookie", cookieRoutes);

// Admin routes
const adminRoutes = require("./admin")

router.use("/admin", adminRoutes);


// Note routes
const noteRoutes = require("./note");

router.use("/note", noteRoutes);


const recordsRoutes = require("./records");

// Records routes
router.use("/records", recordsRoutes);


const reservationRoutes = require("./reservation");

// Reservation routes
router.use("/reservation", reservationRoutes);


module.exports = router;