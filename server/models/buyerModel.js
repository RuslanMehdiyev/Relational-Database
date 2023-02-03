const { default: mongoose, Schema } = require("mongoose");

const Buyer = new Schema({
  buyerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  buyerAddress: {
    type: "ObjectId",
    ref: "Address",
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

const buyerModel = mongoose.model("Buyer", Buyer);

module.exports = {
  buyerModel,
};
