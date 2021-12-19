import {NextFunction, Request, Response} from "express";
import {validateSupportedColor} from "../utils/validators";
import {error_wrapper} from "./errorHandler";

export function colorValidatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {bgColor, textColor} = req.query as Record<string, string>;
    validateSupportedColor(textColor, "textColor");
    validateSupportedColor(bgColor, "bgColor");
  });
}
