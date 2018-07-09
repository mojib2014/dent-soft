const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userType: {type: String, required: false},
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    password: { type: String, required: true },
    imageUrl: {type: String, required: false},
    userType: {type: String, required: true},
    profileImage: { type: String, required: false },
    phone: { type: Number, required: false },
    birth_date: { type: Date, required: false },
    address: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zip_code: { type: String, required: false },
    provider: { type: String, required: false},
    provider_id: { type: String, required: false },
    provider_pic: { type: String, required: false },
    token: { type: String, required: false },
    record: [{ type: Schema.Types.ObjectId, required: false, ref: "Record"}],
    note: [{ type: Schema.Types.ObjectId, required: false, ref: "Note" }],
    reservations: [{ type: String, required: false, ref: "Reservation"}]

});

const User = mongoose.model("user", usersSchema);

module.exports = User;