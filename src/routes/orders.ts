import {Router} from "express";
import {IOrderWithProducts} from "../interfaces/Order";
import {auth_middleware} from "../middlewares/auth";
import {id_validation_middleware} from "../middlewares/idValidator";
import {order_validation_middleware} from "../middlewares/orderValidationMiddleware";
import {string_id_validation_middleware} from "../middlewares/stringIdValidator";
import OrdersStore from "../models/order";
import ProductOrderStore from "../models/orderProductRelation";
import {OrdersService} from "../services/orders";
import {HttpCodes, OrderStatus} from "../utils/constants";

const orders_store = new OrdersStore();
const order_product_store = new ProductOrderStore();
const orders_router = Router();

orders_router.get("/user/:id", string_id_validation_middleware, async (req, res) => {
  const orders = await OrdersService.products_with_user_id(req.params.id);
  res.status(HttpCodes.ok).send(orders);
});

orders_router.get("/:id", id_validation_middleware, async (req, res) => {
  const number_id = parseInt(req.params.id);
  const order = await OrdersService.products_with_order_id(number_id);
  if (!order) {
    res.status(HttpCodes.not_found).end();
    return;
  }
  res.status(HttpCodes.ok).send(order);
});

orders_router.post("/", auth_middleware, order_validation_middleware, async (req, res) => {
  const {order} = req.body as {order: IOrderWithProducts};
  if (!res.locals.decoded_token) {
    throw new Error("Couldn't find decoded_token in res.locals!");
  }
  const {id} = res.locals.decoded_token;
  const created_order = await orders_store.create({
    user_id: id,
    status: order.status || OrderStatus.active,
  });
  const relations = await Promise.all(
    order.products.map(({id, qty}) =>
      order_product_store.create({
        order_id: created_order.id,
        qty,
        product_id: id,
      }),
    ),
  );
  res.status(HttpCodes.created).send({
    id: created_order.id,
    status: created_order.status,
    products: relations.map(({product_id, qty}) => ({product_id, qty})),
  });
});

export default orders_router;
