const { default: mongoose, Schema } = require("mongoose");

const Users = {
  userName: {
    type: String,
    required: true,
  },
  password: {
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
};

const userModel = mongoose.model("User", Users);

module.exports = {
  userModel,
};
