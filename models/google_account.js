const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleSchema = new Schema({
    googleId: {type: String, required: true},
    userType: {type: String, required: false},
    googleImage: {type: String, required: true},
    googleEmail: {type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    firstName: { type: String, required: true},
    lastName: {type: String, required: false},
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
    reservations: [{ type: Schema.Types.ObjectId, required: false, ref: "Reservation"}]
})

const Google_Account = mongoose.model("google_account", googleSchema);

module.exports = Google_Account