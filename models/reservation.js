const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    date: { type: String, required: true },
    start_time: { type: String, required: true },
    reservationDetail: { type: String, required: true },
    user_id: { type: String, required: true }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
