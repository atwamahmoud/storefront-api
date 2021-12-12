import {PoolClient} from "pg";
import dbClient from "../database";

export default abstract class AbstractModel<T> {
  abstract index(): Promise<T[]>;
  abstract show(id: number): Promise<T>;
  abstract create(data: T): Promise<T>;
  getConnection(): Promise<PoolClient> {
    return dbClient.connect();
  }
}
