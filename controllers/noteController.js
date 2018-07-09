const db = require("../models");

// Defining methods for the noteController
module.exports = {
    findAll: function(req, res) {
        db.Note
          .find(req.query)
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
        db.Note
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
        // console.log("controller", req.body)
        db.Note
          .create(req.body)
          .then(dbModel => {
            // res.json(dbModel)
            db.Users
              .findByIdAndUpdate(req.body.id, { $push: { note: dbModel._id }})
              .then((result)=>{res.json(result)})
              .catch(err => res.status(422).json(err))
          })
          .catch(err => res.status(422).json(err));
      },
      update: function(req, res) {
        db.Note
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
      remove: function(req, res) {
        db.Note
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}