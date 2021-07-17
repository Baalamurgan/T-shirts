import express from "express";
import Router from "express";
const paymentRoutes = Router();

import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getToken, processPayment } from "../controllers/payment.js";

paymentRoutes.get(
  "/payment/gettoken/:userId",
  isSignedIn,
  isAuthenticated,
  getToken
);

paymentRoutes.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);
export { paymentRoutes };
