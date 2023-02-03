const express = require("express");
const { addressController } = require("../controllers/addressController");
const addressRouter = express.Router();

addressRouter.get("/", addressController.getAll);
addressRouter.get("/:id", addressController.getById);
addressRouter.post("/", addressController.add);
addressRouter.delete("/:id", addressController.delete);
addressRouter.put("/:id", addressController.update);

module.exports = addressRouter;
