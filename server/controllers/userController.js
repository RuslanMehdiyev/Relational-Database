const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const userController = {
  getAll: (req, res) => {
    userModel.find({ isDeleted: false }, (err, docs) => {
      if (!err) {
        res.json(docs);
      } else {
        res.status(500).json(err);
      }
    });
  },
  add: (req, res) => {
    const { userName, password } = req.body;
    const newUser = new userModel({ userName, password });
    newUser.save((err, doc) => {
      if (!err) {
        let privateKey = "maidenTower";
        let token = jwt.sign({ userName: newUser.userName }, privateKey, {
          algorithm: "HS256",
          expiresIn: "8h",
        });
        res.json({ token: token });
      } else {
        res.status(500).json(err);
      }
    });
  },
};

module.exports = {
  userController,
};
