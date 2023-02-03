const { default: mongoose, Schema } = require("mongoose");

const Orders = new Schema({
  productName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: "ObjectId",
    ref: "Category",
  },
  productPrice: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  buyerId: {
    type: "ObjectId",
    ref: "Buyer",
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const orderModel = mongoose.model("Order", Orders);

module.exports = {
  orderModel,
};
