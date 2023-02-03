const { buyerModel } = require("../models/buyerModel");

const buyerController = {
  getAll: (req, res) => {
    buyerModel
      .find({ isDeleted: false })
      .populate("buyerAddress")
      .exec((err, doc) => {
        if (!err) {
          res.json(doc);
        } else {
          res.status(500).json(err);
        }
      });
  },
  add: (req, res) => {
    let { buyerName, phoneNumber, buyerAddress } = req.body;
    let newBuyer = new buyerModel({ buyerName, phoneNumber, buyerAddress });
    newBuyer.save((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    buyerModel
      .findById(id, { isDeleted: false })
      .populate("buyerAddress")
      .exec((err, doc) => {
        if (!err) {
          res.json(doc);
        } else {
          res.status(500).json(err);
        }
      });
  },
  delete: (req, res) => {
    let id = req.params.id;
    buyerModel.findByIdAndDelete(id, { isDeleted: true }, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  update: (req, res) => {
    let id = req.params.id;
    buyerModel.findByIdAndUpdate(
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
  buyerController,
};
