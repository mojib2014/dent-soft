const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    birth_date: { type: Number, required: true },
    address: { type: String, required: true },
    // profile_image: { data: Buffer, required: true },
    record: { type: String, required: true },
    note: { type: String, required: true },
    reservations: { type: String, required: true }
});

const User = mongoose.model("user", usersSchema);

module.exports = User;
