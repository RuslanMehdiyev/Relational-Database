const express = require("express");
const { userController } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.get("/", userController.getAll);
userRoute.post("/", userController.add);

module.exports = userRoute;
