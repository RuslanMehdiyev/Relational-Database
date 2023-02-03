const express = require("express");
const { orderController } = require("../controllers/ordersController");
const orderRouter = express.Router();

orderRouter.get("/", orderController.getAll);
orderRouter.get("/:id", orderController.getById);
orderRouter.post("/", orderController.add);
orderRouter.delete("/:id", orderController.delete);
orderRouter.put("/:id", orderController.update);

module.exports = orderRouter;
