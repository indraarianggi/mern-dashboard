import { Request, Response } from "express";
import mongoose from "mongoose";

import { Transaction, User } from "@/models";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json({ message: "Successfully get admins", data: admins });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get admins" });
  }
};

export const getUserPerformance = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    const salesTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id: string) => {
        return Transaction.findById(id);
      })
    );

    const filteredSalesTransactions = salesTransactions.filter(
      (transaction) => transaction !== null
    );

    res.status(200).json({
      message: "Successfully get user performance",
      data: {
        user: userWithStats[0],
        sales: filteredSalesTransactions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get user performance" });
  }
};
