import {NextFunction, Request, Response} from "express";
import {IOrderWithProducts} from "../interfaces/Order";
import {BadRequestError} from "../utils/badRequestError";
import {OrderStatus} from "../utils/constants";
import {validate_int, validate_positive} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

const AVAILABLE_STATUSES = Object.values(OrderStatus);

export function order_validation_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {order} = req.body as {order: IOrderWithProducts};
    if (!Array.isArray(order.products)) throw new BadRequestError("Expected order.products to be an array");
    if (order.status && !AVAILABLE_STATUSES.includes(order.status))
      throw new BadRequestError(`Expected order.status to any of ${AVAILABLE_STATUSES.join(", ")}`);
    order.products.forEach((product, idx) => {
      const id_name = `order.products[${idx}].id`;
      const qty_name = `order.products[${idx}].qty`;
      validate_int(product.qty, qty_name);
      validate_positive(product.qty, qty_name);
      validate_int(product.id, id_name);
      validate_positive(product.id, id_name);
    });
  });
}
