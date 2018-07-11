const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dent_soft"
);

const usersSeed = 
  [{
    userType: "admin",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@gmail.com",
    password: "2b$10$LFPVwvhAdMDX70xZfQGkSOUln50DCkb8x1C//yr/pXGiacCOms43.",
    imageUrl: "",
    userType: "",
    profileImage: "",
    phone: "",
    birth_date: "",
    address: "",
    city: "",
    state: "",
    zip_code: "",
    provider: "",
    provider_id: "",
    provider_pic: "",
    token: "",
    record: "",
    note: "",
    reservations: "",
  }]
  

db.Users
  .remove({})
  .then(() => db.Users.collection.insertMany(usersSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
