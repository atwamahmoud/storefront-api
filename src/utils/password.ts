import {hash} from "bcrypt";
import {SALT_ROUNDS} from "./constants";

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}
