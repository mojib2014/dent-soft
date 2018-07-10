const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordsSchema = new Schema({
    
    recordName: { type: String, required: true },
    recordUrl: { type: String, required: true } 
});

const Record = mongoose.model("Record", recordsSchema);

module.exports = Record;
