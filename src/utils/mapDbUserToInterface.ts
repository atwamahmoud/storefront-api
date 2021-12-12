import IOrder from "../interfaces/Order";
import {IUserWithReqID} from "../interfaces/User";
import {OrderStatus} from "./constants";

export const mapDbUserToInterface = (dbUser: Record<string, unknown>): IUserWithReqID => ({
  firstName: dbUser.first_name as string,
  lastName: dbUser.last_name as string,
  id: dbUser.id as number,
  password: dbUser.password_hash as string,
});

export const mapDbOrderToInterface = (dbOrder: Record<string, unknown>): IOrder => ({
  userId: dbOrder.user_id as number,
  id: dbOrder.id as number,
  status: dbOrder.status as OrderStatus,
});
