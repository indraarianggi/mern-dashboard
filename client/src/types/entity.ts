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
