import {Router} from "express";
import {IOrderWithProducts} from "../interfaces/Order";
import {auth_middleware} from "../middlewares/auth";
import {id_validation_middleware} from "../middlewares/idValidator";
import {order_validation_middleware} from "../middlewares/orderValidationMiddleware";
import {string_id_params_validation_middleware} from "../middlewares/stringIdValidator";
import OrdersStore from "../models/order";
import ProductOrderStore from "../models/orderProductRelation";
import {OrdersService} from "../services/orders";
import {HttpCodes, OrderStatus} from "../utils/constants";

const orders_store = new OrdersStore();
const order_product_store = new ProductOrderStore();
const orders_router = Router();

/**
 * @api {get} /orders/user/:id Get user orders
 * @apiName GetUserOrders
 * @apiGroup Orders
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiParam {String} id  User Id
 *
 * @apiSuccess {Object[]} orders.
 * @apiSuccess {Number} orders.id id of order.
 * @apiSuccess {String} orders.status status of order
 * @apiSuccess {String} orders.user_id user_id of order
 * @apiSuccess {Object[]} orders.products products contained within this order
 * @apiSuccess {Number} orders.products.id id of product
 * @apiSuccess {Number} orders.products.qty qty of product
 *
 * @apiSuccessExample {json} Success-Response:
 *  [
 *    {
 *      id: 1,
 *      status: "ACTIVE",
 *      user_id: "m_atwa",
 *      products: [
 *        id: 3,
 *        qty: 4,
 *      ],
 *    }
 *  ]
 *
 * @apiExample {js} Example usage:
 *  fetch("orders/user/m_atwa")
 */
orders_router.get("/user/:id", string_id_params_validation_middleware, auth_middleware, async (req, res) => {
  const {id} = req.params;
  if (!res.locals.decoded_token) {
    throw new Error("Couldn't find decoded_token in res.locals!");
  }
  const {id: token_id} = res.locals.decoded_token;
  if (id !== token_id) return res.status(HttpCodes.unauthorized).end();
  const orders = await OrdersService.products_with_user_id(id);
  res.status(HttpCodes.ok).send(orders);
});

/**
 * @api {get} /orders/:id Get Order
 * @apiName GetOrderDetails
 * @apiGroup Orders
 *
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiParam {String} id  Order Id
 *
 * @apiSuccess {Object} order.
 * @apiSuccess {Number} order.id id of order.
 * @apiSuccess {String} order.status status of order
 * @apiSuccess {String} order.user_id user_id of order
 * @apiSuccess {Object[]} order.products products contained within this order
 * @apiSuccess {Number} order.products.id id of product
 * @apiSuccess {Number} order.products.qty qty of product
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      id: 1,
 *      status: "ACTIVE",
 *      user_id: "m_atwa",
 *      products: [
 *        id: 3,
 *        qty: 4,
 *      ],
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("order/1")
 */
orders_router.get("/:id", id_validation_middleware, auth_middleware, async (req, res) => {
  const number_id = parseInt(req.params.id);
  const order = await OrdersService.products_with_order_id(number_id);

  if (!order) return res.status(HttpCodes.not_found).end();

  if (!res.locals.decoded_token) {
    throw new Error("Couldn't find decoded_token in res.locals!");
  }
  const {id: token_id} = res.locals.decoded_token;
  if (order?.user_id !== token_id)
    return res.status(HttpCodes.unauthorized).send({"order?.user_id": order?.user_id, "token_id": token_id});

  res.status(HttpCodes.ok).send(order);
});

/**
 * @api {post} /orders Create Order
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiParam {Object} order.
 * @apiParam {String="ACTIVE","COMPLETE"} [order.status="ACTIVE"] status of order
 * @apiParam {Object[]} order.products products contained within this order
 * @apiParam {Number} order.products.id id of product
 * @apiParam {Number} order.products.qty qty of product
 *
 * @apiParamExample {json} Success-Response:
 *    {
 *      status: "ACTIVE",
 *      products: [
 *        id: 3,
 *        qty: 4,
 *      ],
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("order", {
 *    method: "POST",
 *    body: JSON.stringify({
 *      order: {
 *        status: "ACTIVE",
 *        products: [
 *          id: 3,
 *          qty: 4,
 *        ],
 *      }
 *    })
 *  })
 */
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
