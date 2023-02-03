const express = require("express");
const { categoryController } = require("../controllers/categoryController");
const categoryRouter = express.Router();

categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.getById);
categoryRouter.post("/", categoryController.add);
categoryRouter.delete("/:id", categoryController.delete);
categoryRouter.put("/:id", categoryController.update);

module.exports = categoryRouter;
