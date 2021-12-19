import {BadRequestError} from "../badRequestError";
import {DIGITS_ONLY_REGEX} from "../constants";

export function validate_int_as_string(int?: string, name = "int"): void {
  if (typeof int === "undefined") {
    throw new BadRequestError(`Invalid ${name}, expected an int, found undefined`);
  }
  if (!DIGITS_ONLY_REGEX.test(int)) {
    throw new BadRequestError(`Invalid ${name}, ${name} must be an int!`);
  }
}
