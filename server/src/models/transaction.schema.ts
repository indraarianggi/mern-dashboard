import mongoose, { Schema, model } from "mongoose";

import { ITransaction } from "@/types";

const transactionSchema = new Schema<ITransaction>(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = model("Transaction", transactionSchema);
