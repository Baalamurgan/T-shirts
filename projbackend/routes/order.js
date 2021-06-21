import express from "express";
import Router from "express";

const orderRoutes = Router();

import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getProductById, updateStock } from "../controllers/product.js";
import { getUserById, pushOrderInPurchaseList } from "../controllers/user.js";
import { createOrder, getOrderById, getAllOrders,updateStatus,getOrderstatus } from "../controllers/order.js";

//params
orderRoutes.param("userId", getUserById);
orderRoutes.param("orderId", getOrderById);

//My routes
//create
orderRoutes.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

//read
orderRoutes.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

//status of order
orderRoutes.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getOrderstatus);
orderRoutes.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus);
//update

//delete
export { orderRoutes };
