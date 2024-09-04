import { Request, Response } from "express";

import { User } from "@/models";

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    res.status(200).json({ message: "Successfully get admins", data: admins });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get admins" });
  }
};
