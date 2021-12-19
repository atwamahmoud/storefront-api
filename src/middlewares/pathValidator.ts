import {Request, Response, NextFunction} from "express";
import {validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function pathValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {filename, url} = req.query as Record<string, string>;
    validate_string(filename || url, "filename or url");
  });
}
