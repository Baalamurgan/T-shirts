import {User} from "../models/user.js";
import {Order} from "../models/order.js"

export function getUserById(req,res,next,id){
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }
        req.profile=user;
        console.log(req.profile);
        next(); 
    });
}

export function getUser(req,res){
    //TODO:get back here
    req.profile.salt=undefined;
    req.profile.encry_password=undefined;
    return res.json(req.profile);
}

export function updateUser(req,res){
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body}, //!req.body not req.profile
        {new: true, useFindAndModify: false}, //!useFindAndModify set to false must
        (err,user) => {
            if(err || !user){
                return res.status(400).json({
                    error: "You are not authorized to update this user"
                })
            }
            user.salt=undefined;
            user.encry_password=undefined;
            // console.log(req.body);
            // console.log(req.profile);
            // console.log(user);
            res.json(user);
        }
    )
}

export function userPurchaseList(req,res){
    Order.find({user: req.profile._id})
        .populate("user","_id name")
        .exec((err,order)=>{
            if(err){
                return res.status(400).json({
                    error: "No orders found in this user"
                })
            }
            return res.json(order);
        })
}

export function pushOrderInPurchaseList(req,res,next){
    let purchases = [];
    req.body.order.products.forEach((product) =>{
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    //Storing in DB
    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err,purchase) => {
            if(err){
                return res.status(400).json({
                    error: "Unable to save purchase list"
                })
            }
            next();
        }
    );
}