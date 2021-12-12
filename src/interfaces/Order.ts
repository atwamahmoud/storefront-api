import {OrderStatus} from "../utils/constants";

export default interface IOrder {
  id?: number;
  userId: number;
  status: OrderStatus;
}

export interface IOrderWithProducts extends IOrder {
  products: {
    id: number;
    qty: number;
  }[];
}
