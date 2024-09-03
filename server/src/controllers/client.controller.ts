import { Request, Response } from "express";
import { getCountryISO3 } from "ts-country-iso-2-to-3";

import { Product, ProductStat, Transaction, User } from "@/models";
import { FormattedSort } from "@/types";

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
    res.status(404).json({ message: "Failed to get products" });
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
    res.status(404).json({ message: "Failed to get customers" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    /**
     * sort from client should look like this: { "field":  "userId", "sort": "desc" }
     */
    const { page = 0, pageSize = 20, sort = null, search = "" } = req.query;
    const _page = Number(page); // page start from 0
    const _pageSize = Number(pageSize);

    /**
     * formatted sort should look like this: { userId: -1 }
     */
    const generateSort = () => {
      const sortParsed = JSON.parse(sort as string);
      const sortFormatted: FormattedSort = {
        [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        {
          cost: { $regex: new RegExp(search as string, "i") },
          userId: { $regex: new RegExp(search as string, "i") },
        },
      ],
    })
      .sort(sortFormatted)
      .skip(_page * _pageSize)
      .limit(_pageSize);

    const total = await Transaction.countDocuments({
      $or: [
        {
          cost: { $regex: search, $options: "i" },
          userId: { $regex: search, $options: "i" },
        },
      ],
    });

    res.status(200).json({
      message: "Successfully get transactions",
      data: {
        items: transactions,
        total,
        page: _page,
        totalPage: Math.ceil(total / _pageSize),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get transactions" });
  }
};

export const getGeography = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, currentUser) => {
      const { country } = currentUser;
      const countryISO3 = getCountryISO3(country);

      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }

      acc[countryISO3]++;

      return acc;
    }, {} as { [key: string]: number });

    const formattedLocations = Object.entries(mappedLocations).map(
      ([countryKey, count]) => {
        return { id: countryKey, value: count };
      }
    );

    res.status(200).json({
      message: "Successfully get geography",
      data: formattedLocations,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Failed to get geography" });
  }
};
