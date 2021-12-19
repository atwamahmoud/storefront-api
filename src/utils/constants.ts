/* eslint-disable no-magic-numbers */
export const BAD_REQUEST = "BAD_REQUEST";
export const DEFAULT_BAD_REQUEST_ERROR_MSG = "Invalid request parameters, please check the docs.";

export enum HttpCodes {
  bad_request = 400,
  server_error = 500,
  not_found = 404,
  unauthorized = 401,
  ok = 200,
  created = 201,
}

export const HTTP_ERROR_NAME = "HTTP_ERROR";

export enum OrderStatus {
  active = "ACTIVE",
  complete = "COMPLETE",
}
export const DEFAULT_SALT_ROUNDS = 10;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "") || DEFAULT_SALT_ROUNDS;

export const JSON_SPACE_NUM = 2;

export const ENV_FILE = process.env.ENV === "test" ? ".env.test" : ".env";

export const DIGITS_ONLY_REGEX = /^\d+$/;
