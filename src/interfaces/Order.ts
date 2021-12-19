import {OrderStatus} from "../utils/constants";

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
