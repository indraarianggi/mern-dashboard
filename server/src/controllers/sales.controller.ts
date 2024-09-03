import { Request, Response } from "express";

import { OverallStat } from "@/models";

export const getSales = async (req: Request, res: Response) => {
  try {
    const overallStat = await OverallStat.find();

    res
      .status(200)
      .json({ message: "Successfully get sales", data: overallStat[0] });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get sales" });
  }
};
