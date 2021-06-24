import Router from "express";
// const { check } = require('express-validator');
import { check, validationResult } from "express-validator";
const authRoutes = Router();
// const {} = require("../controllers/auth");
import {
  signout,
  signup,
  signin,
  isSignedIn,
  isAuthenticated,
  isAdmin,
} from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";

authRoutes.param("userId", getUserById);

authRoutes.post(
  "/signup",
  [
    check("name", "name should be atleast 3 charr").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 3 char").isLength({ min: 3 }),
  ],
  signup
);

authRoutes.post(
  "/signin",
  [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 1 }),
  ],
  signin
);

authRoutes.get("/signout", signout);

authRoutes.get(
  "/testroute",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  (req, res) => {
    res.json({ AUTH: req.auth, PRF: req.profile });
  }
);

export { authRoutes };
