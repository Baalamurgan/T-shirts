import {User} from "../models/user.js";
import {check, validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";
import dotenv from 'dotenv';
dotenv.config();

export function signin(req,res){
    const errors = validationResult(req);
    // console.log(errors);
    const {email , password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({email},(err,user) => {
        // console.log(email);
        if(err != null){
            return res.status(400).json({
                error: err,
            });
        }
        if(!user){
            return res.status(400).json({
                error: "USER email does not exist",
            });
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error: "Email and password do not match",
            })
        }

        //creating token
        const token=jwt.sign({_id: user._id},process.env.SECRET);
        //put token in cookie
        res.cookie("token",token,{expire: new Date() + 9999});

        //send response to front end
        const {_id,name,email,role} = user;
        return res.json({token,user:{_id,name,email,role}});

    })
};


export function signup(req,res){
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({
        error: errors.array()[0].msg,
    })
}
    
    const user = new User(req.body);
    user.save((err, user) =>{
        if(err){
            return res.status(400).json({
                err: "NOT able to save user in DB",
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

export function signout(req,res) {
    res.clearCookie("token");
    res.json({
        message: "User Signed out successfully",
    });
};


//protected routes
export const isSignedIn = expressJwt({
        secret: process.env.SECRET,
        userProperty :"auth",
    });

//custom middlewares
export function isAuthenticated(req,res,next){
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    console.log(req);
    if(!checker){
        return res.status(403).json({
            error: "ACCESS DENIED",
        })
    }
    next();
}

export function isAdmin(req,res,next){
    console.log(req.profile);
    if(req.profile.role === 0){
        console.log(req.profile);
        return res.status(403).json({
            error: "You are not ADMIN"
        })
    }
    next();
}