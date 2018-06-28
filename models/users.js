const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    birth_date: { type: Date, required: true },
    address: { type: String, required: true },
    record: { type: String, required: true },
    note: { type: String, required: true },
    reservations: { type: String, required: true },
    provider: { type: String, required: true},
    provider_id: { type: String, required: true },
    provider_pic: { type: String, required: false },
    token: { type: String, required: true }
});

const User = mongoose.model("user", usersSchema);

module.exports = User;
