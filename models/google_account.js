const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const googleSchema = new Schema({
    googleId: {type: String, required: true},
    googleImage: {type: String, required: true},
    googleEmail: {type: String, match: [/.+@.+\..+/, "Please enter a valid e-mail address"]},
    firstName: { type: String, required: true},
    lastName: {type: String, required: true}
})

const Google_Account = mongoose.model("google_account", googleSchema);

module.exports = Google_Account