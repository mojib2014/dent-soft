const db = require("../models");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
    // console.log("google email", req.body)
    db.google_account.findOne({ googleEmail: req.body.googleEmail })
    .then((result) => {
      // console.log("presignup google", result)
      if (!result) {
        console.log("oh no create")
        db.google_account
              .create(req.body)
              .then(dbModel => res.json(dbModel))
              //return err for err handling
              .catch(err => res.json(err));
      } else {
        // console.log("presignup google null",result)
        res.json(result)
        
      }
    }).catch(err => res.json(err));
  },
  findById: function (req, res) {
    db.Users
      .findOne({_id: req.params.id})
      .populate("note")
      .populate("reservations")
      .populate("record")
      .then(dbModel => {
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findByGoogleId: function(req, res) {
    // console.log("patient page load", req.params.id)
    db.google_account
    .findOne({_id: req.params.id})
      .populate("note")
      .populate("reservations")
      .populate("record")
      .then(
        dbModel => {
          res.json(dbModel)
        })
      .catch(err => res.json(err));
  },
  findByEmail: function (req, res) {
    // console.log(req.params)
    db.Users
      .findOne({email: req.params.email})
      .populate("note") 
      .populate("record") 
      .populate("reservations")
      .then(dbModel => {
        // console.log(dbModel);
        if(dbModel === null) {
          db.google_account
          .findOne({googleEmail: req.params.email})
          .populate("note") 
          .populate("record") 
          .populate("reservations")
          .then(dbModel => {
            res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
        // console.log("here");
      }
        else{
          res.json(dbModel)
        }
      })
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
          res.json({message: auth , _id: dbModel._id, userType: dbModel.userType})
        })
      .catch(err => res.json(err));
  },
  create: function (req, res) {
    //make sure the user does not exist
    db.Users.findOne({ email: req.body.email })
      .then((result) => {
        // console.log("presignup create", result)
        if (!result) {
          // console.log("here create",req.body)
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
  updateGoogle: function (req, res) {
    db.google_account
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  updatePhoto: function (req, res) {
    // console.log("this is =", req.body)
    db.Users
      .findOneAndUpdate({ _id: req.body.id }, { $set: { imageUrl: req.body.url }})
      .then(dbModel => {
        if(dbModel === null) {
        db.google_account
        .findOneAndUpdate({ _id: req.body.id }, { $set: { googleImage: req.body.url }})
        .then(dbModel => {
          res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
      // console.log("here");
    }
      else{
        res.json(dbModel)
      }
    })
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
