require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const addressRouter = require("./routers/addressRoute");
const categoryRouter = require("./routers/categoryRoute");
const buyerRouter = require("./routers/buyerRoute");
const orderRouter = require("./routers/orderRoute");
const userRoute = require("./routers/userRoute");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then((res) => console.log("Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.json("Hello");
});

app.use("/api/address", addressRouter);
app.use("/api/category", categoryRouter);
app.use("/api/buyer", buyerRouter);
app.use("/api/orders", orderRouter);
app.use("/auth/login", userRoute);

app.listen(PORT);
