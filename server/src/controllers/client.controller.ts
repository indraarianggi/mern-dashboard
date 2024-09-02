import { Product, ProductStat, User } from "@/models";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.findOne({
          productId: product._id,
        });

        return {
          ...product._doc,
          stat,
        };
      })
    );

    res
      .status(200)
      .json({ message: "Successfully get products", data: productsWithStats });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get user" });
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");

    res
      .status(200)
      .json({ message: "Successfully get customers", data: customers });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get user" });
  }
};
