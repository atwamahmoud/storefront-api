import {OrderStatus} from "../utils/constants";
import IProduct from "./Product";

export default interface IOrder {
  id?: number;
  user_id: string;
  status: OrderStatus;
}
export interface IOrderWithReqID extends IOrder {
  id: number;
}

export interface IOrderWithProducts extends IOrderWithReqID {
  products: {
    id: number; // Makes id in `IProduct` required
    qty: number;
  }[];
}
