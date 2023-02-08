const { orderModel } = require("../models/ordersModel");

const orderController = {
  getAll: (req, res) => {
    const { start, end, limit, sort } = req.query;

    const dateRange = {};
    if (start) dateRange.date = { $gte: start };
    if (end) dateRange.date = { ...dateRange.date, $lte: end };
    const sortOrder = sort === "asc" ? 1 : -1;

    orderModel
      .find({
        isDeleted: false,
        date: dateRange,
      })
      .limit(limit)
      .sort({ productPrice: sortOrder })
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
