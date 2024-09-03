export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductStat {
  _id: string;
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData;
  createdAt: string;
  updatedAt: string;
}

export interface IMonthlyData {
  month: string;
  totalSales: number;
  totalUnits: number;
}

export interface IDailyData {
  date: string;
  totalSales: number;
  totalUnits: number;
}

export interface IProductWithStat extends IProduct {
  stat: IProductStat;
}

export interface ITransaction {
  _id: string;
  userId: string;
  cost: string;
  products: string[];
  createdAt: string;
  updatedAt: string;
}
