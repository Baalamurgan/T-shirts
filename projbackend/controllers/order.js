import { Order, ProductCart } from "../models/order.js";

export function getOrderById(req, res, next, id) {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB",
        });
      }
      req.ord = order;
      next();
    });
}

export function createOrder(req,res){
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err,newOrder) => {
        if(err){
            return res.status(400).json({
                error: "Failed to save your order in DB"
            })
        }
        return res.json(newOrder);
    })
}

export function getAllOrders(req,res){
    Order.find()
        .populate("user", "_id name")
        .exec((err,orders) => {
            if(err){
                return res.status(400).json({
                    error: "No orders found from this user in DB"
                })
            }
            res.json(orders);
        })
}

export function getOrderstatus(req,res){
    return res.json(Order.schema.path("status").enumValues)
}

export function updateStatus(req,res){
    Order.update(
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (err,order) => {
            if(err){
                return res.status(400).json({
                    error: "Cannot update order status"
                })
            }
            return res.json(order);
        }
    )
}