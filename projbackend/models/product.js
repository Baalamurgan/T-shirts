import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true
    },
    description: {
      type: String,
      maxlength: 2000,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Product",productSchema);
export const Product = mongoose.model("Product",productSchema);