const { userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  direct: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

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
  sendMail: (req, res) => {
    let { email, sendto } = req.query;
    let mailOptions = {
      from: process.env.EMAIL,
      to: sendto,
      subject: "Nodemailer test",
      text: email,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ error });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send({ message: "Email sent successfully" });
      }
    });
  },
};

module.exports = {
  userController,
};
