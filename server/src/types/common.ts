import { SortOrder } from "mongoose";

export interface FormattedSort {
  [key: string]: SortOrder;
}
