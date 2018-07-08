const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordsSchema = new Schema({
    
    record: { type: String, required: true } 
});

const Record = mongoose.model("Record", recordsSchema);

module.exports = Record;
