const db = require("../models");


// Defining methods for the recordsController.
module.exports = {
    findAll: function(req, res) {
        db.Records
          .find(req.query)
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
        db.Records
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        console.log("record create",req.body)
        db.Records
        .create(req.body)
        .then(dbModel => {
          db.Users
            .findByIdAndUpdate(req.body.id, { $push: { record: dbModel._id }})
            .then((result)=>{res.json(result)})
            .catch(err => res.status(422).json(err))
        })
        .catch(err => res.status(422).json(err));
    },
      update: function(req, res) {
        db.Records
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      remove: function(req, res) {
        console.log("record ",req.params.id)
        db.Records
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      } 
}
