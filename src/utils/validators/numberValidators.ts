import {BadRequestError} from "../badRequestError";

export function validate_float(float: number, name = "Float"): void {
  if (typeof float !== "number" || float % 1 === 0) {
    throw new BadRequestError(`Invalid ${name}, expected a float!`);
  }
}

export function validate_int(int: number, name = "Int"): void {
  if (typeof int !== "number" || int % 1 !== 0) {
    throw new BadRequestError(`Invalid ${name}, expected an int!`);
  }
}
export function validate_number(num: number, name = "Number"): void {
  if (typeof num !== "number") {
    throw new BadRequestError(`Invalid ${name}, expected number!`);
  }
}

export function validate_positive(num: number, name = "Positive"): void {
  if (num < 0) {
    throw new BadRequestError(`Invalid ${name}, Expected positive number!`);
  }
}

export function validate_negative(num: number, name = "Negative"): void {
  if (num < 0) {
    throw new BadRequestError(`Invalid ${name}, Expected negative number!`);
  }
}
