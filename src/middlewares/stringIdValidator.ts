import {NextFunction, Request, Response} from "express";
import {validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function string_validation_hof(string_key: string, string_name?: string) {
  return function (req: Request, res: Response, next: NextFunction): void {
    error_wrapper(req, res, next, () => {
      validate_string(req.body.string_key, string_name || string_key);
    });
  };
}
export const string_id_validation_middleware = string_validation_hof("id", "ID");
export const password_validation_middleware = string_validation_hof("password", "Password");
