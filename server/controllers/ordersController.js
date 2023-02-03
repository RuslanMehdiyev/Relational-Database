const { orderModel } = require("../models/ordersModel");

const orderController = {
  getAll: (req, res) => {
    orderModel
      .find({ isDeleted: false })
      .populate("categoryId")
      .populate({ path: "buyerId", populate: { path: "buyerAddress" } })
      .exec((err, docs) => {
        if (!err) {
          res.json(docs);
        } else {
          res.status(500).json(err);
        }
      });
  },
  add: (req, res) => {
    let { productName, productDescription, productPrice, buyerId, categoryId } =
      req.body;
    let newOrder = new orderModel({
      productName,
      productDescription,
      productPrice,
      buyerId,
      categoryId,
    });

    newOrder.save((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    orderModel
      .findById(id)
      .populate("categoryId")
      .populate({ path: "buyerId", populate: { path: "buyerAddress" } })
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
    orderModel.findByIdAndDelete(
      id,
      { isDeleted: true },

      (err, doc) => {
        if (!err) {
          res.json(doc);
        } else {
          res.status(500).json(err);
        }
      }
    );
  },
  update: (req, res) => {
    let id = req.params.id;
    orderModel.findByIdAndUpdate(
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
  orderController,
};
