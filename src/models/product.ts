import IProduct, {IProductWithReqID} from "../interfaces/Product";
import {JSON_SPACE_NUM} from "../utils/constants";
import AbstractModel from "./AbstractModel";

export default class ProductsStore extends AbstractModel<IProduct> {
  async index(): Promise<IProductWithReqID[]> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM products";
      const results = await connection.query<IProductWithReqID>(QUERY);
      connection.release();
      return results.rows;
    } catch (error: unknown) {
      throw new Error(`Unable to get all products: ${error}`);
    }
  }
  async show(id: number): Promise<IProductWithReqID | undefined> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM products WHERE id = $1";
      const results = await connection.query<IProductWithReqID>(QUERY, [id]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to get product with id=${id}: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const connection = await this.get_connection();
      const QUERY = "DELETE FROM products WHERE id = $1";
      await connection.query(QUERY, [id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete product with id=${id}: ${error}`);
    }
  }
  async create(data: IProduct): Promise<IProductWithReqID> {
    try {
      const connection = await this.get_connection();
      const QUERY = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const results = await connection.query<IProductWithReqID>(QUERY, [data.name, data.price, data.category]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to create product with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`);
    }
  }
}
