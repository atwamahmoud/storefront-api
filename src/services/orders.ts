import db_client from "../database";
import {IOrderWithProducts, IOrderWithReqID} from "../interfaces/Order";
import IOrderProductRelation from "../interfaces/OrderProduct";

export class OrdersService {
  static async products_with_order_id(order_id: number): Promise<IOrderWithProducts | undefined> {
    const connection = await db_client.connect();
    const results = await connection.query<IOrderWithReqID & IOrderProductRelation>(
      "SELECT * FROM product_orders INNER JOIN orders on product_orders.order_id = orders.id WHERE order_id = $1 ",
      [order_id],
    );
    if (!results.rows.length) return undefined;
    const products = results.rows.map((result) => ({
      id: result.product_id,
      qty: result.qty,
    }));
    return {
      id: order_id,
      user_id: results.rows[0].user_id,
      status: results.rows[0].status,
      products,
    };
  }

  static async products_with_user_id(user_id: string): Promise<IOrderWithProducts[]> {
    try {
      const connection = await db_client.connect();
      const results = await connection.query<{order_id: number}>(
        "SELECT order_id FROM orders INNER JOIN product_orders on orders.id = product_orders.order_id WHERE user_id = $1",
        [user_id],
      );
      if (!results.rows.length) return [];
      connection.release();

      const orders = (await Promise.all(
        results.rows.map(({order_id}) => OrdersService.products_with_order_id(order_id)),
      )) as IOrderWithProducts[];
      return orders;
    } catch (error: unknown) {
      throw new Error(`Unable to get order with user_id=${user_id}: ${error}`);
    }
  }
}
