import IOrderProductRelation from "../interfaces/OrderProduct";
import {JSON_SPACE_NUM} from "../utils/constants";
import AbstractModel from "./AbstractModel";

export default class ProductOrderStore extends AbstractModel<IOrderProductRelation> {
  async index(): Promise<IOrderProductRelation[]> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM product_orders";
      const results = await connection.query<IOrderProductRelation>(QUERY);
      connection.release();
      return results.rows;
    } catch (error: unknown) {
      throw new Error(`Unable to get all products: ${error}`);
    }
  }
  async show(order_id: number, product_id: number): Promise<IOrderProductRelation | undefined> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM product_orders WHERE product_id = $1 AND order_id = $2";
      const results = await connection.query<IOrderProductRelation>(QUERY, [product_id, order_id]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to get product with product_id=${product_id} & order_id=${order_id}: ${error}`);
    }
  }
  async delete(order_id: number, product_id: number): Promise<void> {
    try {
      const connection = await this.get_connection();
      const QUERY = "DELETE FROM product_orders WHERE product_id = $1 AND order_id = $2";
      await connection.query(QUERY, [product_id, order_id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete product with product_id=${product_id} & order_id=${order_id}}: ${error}`);
    }
  }
  async create(data: IOrderProductRelation): Promise<IOrderProductRelation> {
    try {
      const connection = await this.get_connection();
      const QUERY = "INSERT INTO product_orders (order_id, product_id, qty) VALUES ($1, $2, $3) RETURNING *";
      const results = await connection.query<IOrderProductRelation>(QUERY, [data.order_id, data.product_id, data.qty]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(
        `Unable to create product order with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`,
      );
    }
  }
}
