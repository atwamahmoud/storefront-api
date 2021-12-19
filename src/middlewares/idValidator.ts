import {NextFunction, Request, Response} from "express";
import {DIGITS_ONLY_REGEX, HttpCodes} from "../utils/constants";
import {HTTPError} from "../utils/HTTPError";
import {error_wrapper} from "./errorHandler";

export function id_validation_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const {id} = req.params;
    if (DIGITS_ONLY_REGEX.test(id)) return;
    throw new HTTPError(HttpCodes.bad_request, `Invalid id = ${id}, expected an int`);
  });
}
