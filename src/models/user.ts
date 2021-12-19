import IUser from "../interfaces/User";
import {JSON_SPACE_NUM} from "../utils/constants";
import AbstractModel from "./AbstractModel";

export default class UsersStore extends AbstractModel<IUser> {
  async index(): Promise<IUser[]> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT id, first_name, last_name FROM users";
      const results = await connection.query<IUser>(QUERY);
      connection.release();
      return results.rows;
    } catch (error: unknown) {
      throw new Error(`Unable to get all users: ${error}`);
    }
  }
  async show(id: string): Promise<IUser | undefined> {
    try {
      const connection = await this.get_connection();
      const QUERY = "SELECT * FROM users WHERE id = $1";
      const results = await connection.query<IUser>(QUERY, [id]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to get user with id=${id}: ${error}`);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const connection = await this.get_connection();
      const QUERY = "DELETE FROM users WHERE id = $1";
      await connection.query(QUERY, [id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete user with id=${id}: ${error}`);
    }
  }
  async create(data: IUser): Promise<IUser> {
    try {
      const connection = await this.get_connection();
      const QUERY = "INSERT INTO users (id, first_name, last_name, password_hash) VALUES ($1, $2, $3, $4) RETURNING *";
      const results = await connection.query<IUser>(QUERY, [
        data.id,
        data.first_name,
        data.last_name,
        data.password_hash,
      ]);
      connection.release();
      return results.rows[0];
    } catch (error: unknown) {
      throw new Error(`Unable to create user with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`);
    }
  }
}
