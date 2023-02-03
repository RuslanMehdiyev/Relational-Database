const { default: mongoose, Schema } = require("mongoose");

const Categories = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const categoryModel = mongoose.model("Category", Categories);

module.exports = {
  categoryModel,
};
