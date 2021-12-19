import {NextFunction, Request, Response} from "express";
import {validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function string_id_validation_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {id} = req.params;
    validate_string(id, "ID");
  });
}
