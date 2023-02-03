const { addressModel } = require("../models/addressModel");

const addressController = {
  getAll: (req, res) => {
    addressModel.find({ isDeleted: false }, (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  add: (req, res) => {
    let { city, postalCode, region, streetName } = req.body;
    let newAddress = new addressModel({ city, postalCode, region, streetName });
    newAddress.save((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    addressModel.findById(id, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    addressModel.findByIdAndDelete(id, { isDeleted: true }, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  update: (req, res) => {
    let id = req.params.id;
    addressModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true },
      (err, doc) => {
        if (!err) {
          res.json(doc);
        } else {
          res.status(500).json(err);
        }
      }
    );
  },
};

module.exports = {
  addressController,
};
