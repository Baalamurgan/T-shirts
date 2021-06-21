import express from "express";
import Router from "express";

const productRoutes = Router();

import {isSignedIn,isAuthenticated,isAdmin} from "../controllers/auth.js";
import {getUserById} from "../controllers/user.js";
import {getCategoryById} from "../controllers/category.js";
import {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllProducts,getAllUniqueCategories} from "../controllers/product.js";

//params
productRoutes.param("userId",getUserById);
productRoutes.param("categoryId",getCategoryById);
productRoutes.param("productId",getProductById);

//Myroutes
//create
productRoutes.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);

//read
productRoutes.get("/product/:productId",getProduct);
productRoutes.get("/product/photo/:productId",photo);

//listing all products
productRoutes.get("/products",getAllProducts);
productRoutes.get("/products/categories",getAllUniqueCategories);

//update
productRoutes.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct);
// productRoutes.put("/product/update/:userId/:categoryId/:productId",isSignedIn,isAuthenticated,isAdmin,updateProduct);


//delete
productRoutes.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct);

export {productRoutes}