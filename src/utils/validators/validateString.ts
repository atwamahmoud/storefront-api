import {BadRequestError} from "../badRequestError";

export function validate_string(str?: string, name = "String"): void {
  if (typeof str !== "string" || !str || !str.trim()) {
    throw new BadRequestError(`Invalid ${name}, please check the docs!`);
  }
}
