const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    note: { type: String, required: true } 
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
