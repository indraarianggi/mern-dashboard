export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  city: string;
  state: string | null;
  country: string;
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
  dailyData: IDailyData[];
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

export interface IGeography {
  id: string;
  value: number;
}

export interface ISales {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  salesByCategory: object;
  createdAt: string;
  updatedAt: string;
}

export interface IAffiliateStat {
  _id: string;
  userId: string;
  affiliateSales: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IUserWithAffiliateStat extends IUser {
  affiliateStats: IAffiliateStat;
}

export interface IUserPerformance {
  user: IUserWithAffiliateStat;
  sales: ITransaction[];
}

export interface IDashboardStat {
  totalCustomers: number;
  yearlyTotalSoldUnits: number;
  yearlySalesTotal: number;
  monthlyData: IMonthlyData[];
  salesByCategory: object;
  thisMonthStats: IMonthlyData;
  todayStats: IDailyData;
  transactions: ITransaction[];
}
