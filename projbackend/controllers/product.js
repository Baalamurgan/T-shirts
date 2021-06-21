import { Product } from "../models/product.js";
import formidable from "formidable";
import _ from "lodash";
import fs from "fs";

export function getProductById(req, res, next, id) {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.json(400).json({
        error: "Product not found in DB",
      });
    }
    req.prod = product;
    next();
  });
}

export function createProduct(req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //destructure
    const { name, description, price, category, stock } = fields;

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Fields missing",
      });
    }

    let product = new Product(fields);

    //file handle
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //.log(product);
    //save to DB
    product.save((err, newproduct) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in DB failed",
        });
      }
      return res.json(product);
    });
  });
}

export function getProduct(req, res) {
  req.product.photo = undefined;
  return res.json(req.prod);
}

//middleware
export function photo(req, res, next) {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

export function deleteProduct(req, res) {
  let product = req.prod;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product",
      });
    }
    res.json({
      message: "Product deleted",
      deletedProduct,
    });
  });
}

export function updateProduct(req, res) {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    //updating in DB
    let product = req.prod;
    product = _.extend(req.prod, fields);

    //file handle
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    //.log(product);
    //save to DB
    product.save((err, newproduct) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of product in DB failed",
        });
      }
      return res.json(product);
    });
  });
}

export function getAllProducts(req, res) {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.json(400).json({
          error: "No product found",
        });
      }
      return res.json(products);
    });
}

export function updateStock(req, res, next) {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
}

export function getAllUniqueCategories(req, res) {
  Product.distinct("category", {}, (err, (category) => {
    if(err){
      return res.status(400).json({
        error: "No category found"
      })
    }
    res.json(category);
  }));
}
