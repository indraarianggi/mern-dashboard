export interface IDocumentResult<T> {
  _doc: T;
}

export interface IUser extends IDocumentResult<IUser> {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: "user" | "admin" | "superadmin";
}

export interface IProduct extends IDocumentResult<IProduct> {
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  supply: number;
}

export interface IProductStat extends IDocumentResult<IProductStat> {
  productId: string;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
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

export interface ITransaction extends IDocumentResult<ITransaction> {
  userId: string;
  cost: string;
  products: string[];
}

export interface IOverallStat extends IDocumentResult<IOverallStat> {
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: IMonthlyData[];
  dailyData: IDailyData[];
  salesByCategory: object;
}
