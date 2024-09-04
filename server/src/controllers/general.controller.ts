import { Request, Response } from "express";

import { OverallStat, Transaction, User } from "@/models";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ message: "Successfully get user", data: user });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get user" });
  }
};

export const getDashboardStat = async (req: Request, res: Response) => {
  try {
    // hardcoded values
    const currentMonth = "November";
    const currentYear = 2021;
    const currentDay = "2021-11-15";

    /* Recent Transactions */
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdAt: -1 });

    /* Overall Stats */
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });
    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });

    res
      .status(200)
      .json({
        message: "Successfully get dashboard stats",
        data: {
          totalCustomers,
          yearlyTotalSoldUnits,
          yearlySalesTotal,
          monthlyData,
          salesByCategory,
          thisMonthStats,
          todayStats,
          transactions,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get user" });
  }
};