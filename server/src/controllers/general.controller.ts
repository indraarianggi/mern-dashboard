import { Request, Response } from "express";

import { User } from "@/models";

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
