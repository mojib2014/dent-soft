const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dent_soft"
);

const adminSeed = 
  [{
    name: "",
    email: "",
    password: "",
    profile_image: "",
    birth_date: "",
    phone: "",
    address: ""
  }];
  

db.Admin
  .remove({})
  .then(() => db.Admin.collection.insertMany(adminSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
