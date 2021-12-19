import IOrder, {IOrderWithReqID} from "../interfaces/Order";
import {JSON_SPACE_NUM} from "../utils/constants";
import AbstractModel from "./AbstractModel";

export default class OrdersStore extends AbstractModel<IOrder> {
  async index(): Promise<IOrderWithReqID[]> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM orders";
      const results = await connection.query<IOrderWithReqID>(QUERY);
      connection.release();
      return results.rows;
    } catch (error: unknown) {
      throw new Error(`Unable to get all orders: ${error}`);
    }
  }
  async show(id: number): Promise<IOrderWithReqID | undefined> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT id, user_id, status FROM orders WHERE id = $1";
      const results = await connection.query<IOrderWithReqID>(QUERY, [id]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to get order with id=${id}: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const connection = await this.get_connection();
      const QUERY = "DELETE FROM orders WHERE id = $1";
      await connection.query(QUERY, [id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete order with id=${id}: ${error}`);
    }
  }
  async create(data: IOrder): Promise<IOrderWithReqID> {
    try {
      const connection = await this.get_connection();
      const QUERY = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const results = await connection.query<IOrderWithReqID>(QUERY, [data.user_id, data.status]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to create order with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`);
    }
  }
}
