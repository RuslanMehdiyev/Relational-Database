const { orderModel } = require("../models/ordersModel");

const orderController = {
  getAll: (req, res) => {
    const { start, end, limit, sort } = req.query;
    console.log(start);
    console.log(end);
    const dateRange = {};
    if (start && end)
      dateRange.orderDate = { $gte: new Date(start), $lte: new Date(end) };
    else if (start) dateRange.orderDate = { $gte: new Date(start) };
    else if (end) dateRange.orderDate = { $lte: new Date(end) };

    const sortOrder = sort === "asc" ? 1 : -1;
    console.log(dateRange);
    orderModel
      .find({
        isDeleted: false,
        ...dateRange,
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
