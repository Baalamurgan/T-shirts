import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
//const express = require("express")
import express from "express";
const app = express();
import bodyParser from "body-parser";
import cookieparser from "cookie-parser";
import cors from "cors";

//My routes
import { authRoutes } from "./routes/auth.js";
// const authRoutes = router;
import { userRoutes } from "./routes/user.js";
import { categoryRoutes } from "./routes/category.js";
import { productRoutes } from "./routes/product.js";
import { orderRoutes } from "./routes/order.js";
import { paymentRoutes } from "./routes/payment.js";
// const userRoutes=router;
//import {authRoutes} from "./routes/auth";

//MONGODB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

//Middle-wares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieparser());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

//PORT
const port = 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
