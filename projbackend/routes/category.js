import express from "express";
import Router from "express";

const categoryRoutes = Router();

import { isSignedIn, isAuthenticated, isAdmin } from "../controllers/auth.js";
import { getUserById } from "../controllers/user.js";
import {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} from "../controllers/category.js";

//params
categoryRoutes.param("userId", getUserById);
categoryRoutes.param("categoryId", getCategoryById);

//Myroutes
//create
categoryRoutes.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read
categoryRoutes.get("/category/:categoryId", getCategory);
categoryRoutes.get("/categories", getAllCategories);

//update
categoryRoutes.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete
categoryRoutes.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

export { categoryRoutes };
