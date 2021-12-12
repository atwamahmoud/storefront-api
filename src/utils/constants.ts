/* eslint-disable no-magic-numbers */
export const DEFAULT_SVG_BG_COLOR = "#000000";
export const DEFAULT_SVG_TEXT_COLOR = "#ffffff";

export const BAD_REQUEST = "BAD_REQUEST";
export const DEFAULT_BAD_REQUEST_ERROR_MSG = "Invalid request parameters, please check the docs.";

export enum HttpCodes {
  badRequest = 400,
  serverError = 500,
  notFound = 404,
  ok = 200,
  created = 201,
}

export const IMG_DIR = process.env.IMAGES_DIR || "images";
export const CACHE_DIR = process.env.CACHE_DIR || "cache";

export const CACHE_FILENAME_SLASH_ESCAPER = "{{slash}}";

export const HTTP_ERROR_NAME = "HTTP_ERROR";

export enum OrderStatus {
  active = "ACTIVE",
  complete = "COMPLETE",
}
export const DEFAULT_SALT_ROUNDS = 10;
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS || "") || DEFAULT_SALT_ROUNDS;

export const JSON_SPACE_NUM = 2;

export const ENV_FILE = process.env.ENV === "test" ? ".env.test" : ".env";
