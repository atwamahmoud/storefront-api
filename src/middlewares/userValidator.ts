import {NextFunction, Request, Response} from "express";
import {validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function user_validation_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {user} = req.body;
    validate_string(user.first_name, "First name");
    validate_string(user.id, "User id");
    validate_string(user.last_name, "Last name");
    validate_string(user.password, "Password");
  });
}
