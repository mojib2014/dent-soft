const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    data: { type: String, required: true },
    start_time: { type: Number, required: true },
    user_id: { type: Number, required: true }
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
