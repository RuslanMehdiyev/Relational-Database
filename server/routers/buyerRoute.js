const express = require("express");
const { buyerController } = require("../controllers/buyerController");
const buyerRouter = express.Router();

buyerRouter.get("/", buyerController.getAll);
buyerRouter.get("/:id", buyerController.getById);
buyerRouter.post("/", buyerController.add);
buyerRouter.delete("/:id", buyerController.delete);
buyerRouter.put("/:id", buyerController.update);

module.exports = buyerRouter;
