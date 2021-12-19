import {Request, Response, NextFunction} from "express";
import {HttpCodes} from "../utils/constants";
import {HTTPError} from "../utils/HTTPError";

export function error_wrapper(req: Request, res: Response, next: NextFunction, func: () => void): void {
  try {
    func();
    next();
  } catch (error: unknown) {
    const casted_error = error as HTTPError;
    res
      .status(casted_error.errorCode || HttpCodes.server_error)
      .end(casted_error.message || "An unknown error have occured!");
    return;
  }
}
