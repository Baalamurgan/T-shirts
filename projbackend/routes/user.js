import express from "express";
import Router from "express";
const userRoutes = Router();

import {isAdmin,isAuthenticated,isSignedIn} from "../controllers/auth.js";
import {getUser,getUserById,updateUser,userPurchaseList} from "../controllers/user.js";

userRoutes.param("userId",getUserById);

userRoutes.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
userRoutes.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

userRoutes.get("/orders/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);


export {userRoutes};