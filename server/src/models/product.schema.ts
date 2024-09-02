import { Schema, model } from "mongoose";

import { IProduct } from "@/types";

const productSchema = new Schema<IProduct>(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  {
    timestamps: true,
  }
);

export const Product = model("Product", productSchema);
