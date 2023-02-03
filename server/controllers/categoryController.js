const { categoryModel } = require("../models/categoryModel");

const categoryController = {
  getAll: (req, res) => {
    categoryModel.find({ isDeleted: false }, (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  add: (req, res) => {
    let newCategory = new categoryModel({
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
    });
    newCategory.save((err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  getById: (req, res) => {
    let id = req.params.id;
    categoryModel.findById(id, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    categoryModel.findByIdAndDelete(id, { isDeleted: true }, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.status(500).json(err);
      }
    });
  },
  update: (req, res) => {
    let id = req.params.id;
    categoryModel.findByIdAndUpdate(
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
  categoryController,
};
