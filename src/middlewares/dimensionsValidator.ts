import {Request, Response, NextFunction} from "express";
import {validate_int_as_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function dimensionValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {width, height} = req.query as Record<string, string>;
    validate_int_as_string(width, "width");
    validate_int_as_string(height, "height");
  });
}
