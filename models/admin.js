const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_image: { data: Buffer, contentType: String },
    birth_date: { type: Number, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true }
  
});

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
