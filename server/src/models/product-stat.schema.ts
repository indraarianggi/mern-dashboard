import { Schema, model } from "mongoose";

import { IProductStat } from "@/types";

const productStatSchema = new Schema<IProductStat>(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const ProductStat = model("ProductStat", productStatSchema);
