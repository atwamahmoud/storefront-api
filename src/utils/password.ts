import {compare, hash} from "bcrypt";
import {SALT_ROUNDS} from "./constants";

export async function hash_password(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function compare_password(password_hash: string, input: string): Promise<boolean> {
  return compare(input, password_hash);
}
