const express = require("express");
const { userController } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.get("/", userController.getAll);
userRoute.post("/", userController.add);
userRoute.post("/mail", userController.sendMail);

module.exports = userRoute;
