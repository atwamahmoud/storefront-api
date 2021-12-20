import {JwtPayload} from "jsonwebtoken";

declare module "jsonwebtoken" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface JwtPayload extends Record<string, any> {
    id: string;
    first_name: string;
    last_name: string;
  }
}
interface ILocals {
  decoded_token?: JwtPayload;
}
declare module "express" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Response {
    locals: ILocals & Record<string, any>;
  }
}
