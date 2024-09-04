import mongoose, { Schema, model } from "mongoose";

import { IAffiliateStat } from "@/types";

const affiliateStatSchema = new Schema<IAffiliateStat>(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

export const AffiliateStat = model("AffiliateStat", affiliateStatSchema);
