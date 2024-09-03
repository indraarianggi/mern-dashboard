import { Schema, model } from "mongoose";

import { IOverallStat } from "@/types";

const overallStatSchema = new Schema<IOverallStat>(
  {
    totalCustomers: Number,
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
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  {
    timestamps: true,
  }
);

export const OverallStat = model("OverallStat", overallStatSchema);
