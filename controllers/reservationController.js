const db = require("../models");


// Defining methods for the reservationController.
module.exports = {
    findAll: function(req, res) {
        db.Reservation
          .find(req.query)
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
        db.Reservation
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        db.Reservation
          .create(req.body)
          .then(dbModel => {
            //push id to user
            // console.log("patientId", req.body.user_id)
            db.Users
            .findByIdAndUpdate(req.body.user_id, { $push: { reservations: dbModel._id }})
            .then((result)=>{
              if(result === null) {
                db.google_account
                .findByIdAndUpdate(req.body.user_id, { $push: { reservations: dbModel._id }})
                .then(results => {
                  res.json(results)
              })
              .catch(err => res.status(422).json(err));
              // console.log("here");
            }
              else{
                res.json(result)
              }
            })
            .catch(err => res.status(422).json(err))          
          })
          .catch(err => res.status(422).json(err));
      },
      update: function(req, res) {
        db.Reservation
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      remove: function(req, res) {
        db.Reservation
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}
