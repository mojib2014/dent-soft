const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dent_soft"
);

const reservationSeed = 
  {
    data: "",
    start_time: "",
    user_id: ""
  }
  

db.Reservation
  .remove({})
  .then(() => db.Reservation.collection.insertMany(reservationSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
