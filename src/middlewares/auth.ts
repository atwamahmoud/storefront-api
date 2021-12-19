import {NextFunction, Request, Response} from "express";
import {validate_string} from "../utils/validators";
import {error_wrapper} from "./errorHandler";
import {verify} from "jsonwebtoken";
import {get_private_key} from "../utils/getPrivateKey";
import {HTTPError} from "../utils/HTTPError";
import {HttpCodes} from "../utils/constants";

export function auth_middleware(req: Request, res: Response, next: NextFunction): void {
  error_wrapper(req, res, next, () => {
    const auth_header = req.header("Authorization");
    validate_string(auth_header, "Auth Header");
    const token = auth_header?.split(" ")[1];
    validate_string(auth_header, "Token");
    verify(token || "", get_private_key(), (err, decoded) => {
      if (err || !decoded) throw new HTTPError(HttpCodes.unauthorized, "Invalid auth token!");
      res.locals.decoded_token = decoded;
    });
  });
}
