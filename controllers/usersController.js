const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Defining methods for the usersController.
module.exports = {
  findAll: function (req, res) {
    db.Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOneAndUpdateGoogle: function (req, res) {
    db.google_account
      .findOneAndUpdate({ googleId: req.body.googleId }, req.body, { upsert: true })
      .then(dbModel => { res.json(dbModel) })
      .catch(err => { res.status(422).json(err) });
  },
  findById: function (req, res) {
    db.Users
      .findOne({ _id: req.params.id })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    db.Users
      .findOne({email: req.params.email})  
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByEmailLocalLogin: function(req, res) {
    db.Users
    .findOne({email: req.body.email})
      .then(
        dbModel => {
          //hash compare use sync otherwise res in unsync compare is true or false cant sent to front end
          let auth = bcrypt.compareSync(req.body.password, dbModel.password); 
          // console.log("cb",auth)
          res.json({message: auth , _id: dbModel._id})
        })
      .catch(err => res.json(err));
  },
  create: function (req, res) {
    //make sure the user does not exist
    db.Users.findOne({ email: req.body.email })
      .then((result) => {
        console.log("presignup", result)
        if (!result) {
          bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            req.body.password = hash;
            db.Users
              .create(req.body)
              .then(dbModel => res.json(dbModel))
              //return err for err handling
              .catch(err => res.json(err));
          });
        } else {
          res.json({message: "Email Already Existed!"})
        }
      }).catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Users
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Users
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
