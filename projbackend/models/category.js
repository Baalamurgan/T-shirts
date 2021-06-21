import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Category", categorySchema);
export const Category = mongoose.model("Category",categorySchema);
