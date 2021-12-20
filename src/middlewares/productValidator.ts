import {NextFunction, Request, Response} from "express";
import {validate_number, validate_positive, validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function product_validation_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {product} = req.body;
    validate_string(product.name, "Product name");
    validate_number(product.price, "Product Price");
    validate_positive(product.price, "Product Price");
    if ("category" in product) validate_string(product.category, "Product category");
  });
}
