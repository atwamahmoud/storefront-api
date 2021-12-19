import {PoolClient} from "pg";
import dbClient from "../database";

export default abstract class AbstractModel<T> {
  abstract index(): Promise<T[]>;
  abstract show(id: number | string, ...args: unknown[]): Promise<T | undefined>;
  abstract delete(id: number | string, ...args: unknown[]): Promise<void>;
  abstract create(data: T): Promise<T>;
  protected get_connection(): Promise<PoolClient> {
    return dbClient.connect();
  }
}
