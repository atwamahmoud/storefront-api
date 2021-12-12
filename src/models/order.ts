import IOrder from "../interfaces/Order";
import {JSON_SPACE_NUM} from "../utils/constants";
import {mapDbOrderToInterface} from "../utils/mapDbUserToInterface";
import AbstractModel from "./AbstractModel";

export default class OrdersStore extends AbstractModel<IOrder> {
  async index(): Promise<IOrder[]> {
    try {
      const connection = await this.getConnection();
      const QUERY = "SELECT * FROM orders";
      const results = await connection.query(QUERY);
      connection.release();
      return results.rows.map(mapDbOrderToInterface);
    } catch (error: unknown) {
      throw new Error(`Unable to get all orders: ${error}`);
    }
  }
  async show(id: number): Promise<IOrder> {
    try {
      const connection = await this.getConnection();
      const QUERY = "SELECT id, user_id, status FROM orders WHERE id = $1";
      const results = await connection.query(QUERY, [id]);
      connection.release();
      return mapDbOrderToInterface(results.rows[0]);
    } catch (error: unknown) {
      throw new Error(`Unable to get order with id=${id}: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const connection = await this.getConnection();
      const QUERY = "DELETE FROM orders WHERE id = $1";
      await connection.query(QUERY, [id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete order with id=${id}: ${error}`);
    }
  }
  async create(data: IOrder): Promise<IOrder> {
    try {
      const connection = await this.getConnection();
      const QUERY = "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const results = await connection.query(QUERY, [data.userId, data.status]);
      connection.release();
      return mapDbOrderToInterface(results.rows[0]);
    } catch (error: unknown) {
      throw new Error(`Unable to create order with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`);
    }
  }
}
