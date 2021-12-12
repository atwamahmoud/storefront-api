import IUser, {IUserWithPassword, IUserWithReqID} from "../interfaces/User";
import {JSON_SPACE_NUM} from "../utils/constants";
import {mapDbUserToInterface} from "../utils/mapDbUserToInterface";
import {hashPassword} from "../utils/password";
import AbstractModel from "./AbstractModel";

export default class UsersStore extends AbstractModel<IUser> {
  async index(): Promise<IUser[]> {
    try {
      const connection = await this.getConnection();
      const QUERY = "SELECT id, first_name, last_name FROM users";
      const results = await connection.query(QUERY);
      connection.release();
      return results.rows.map(mapDbUserToInterface);
    } catch (error: unknown) {
      throw new Error(`Unable to get all users: ${error}`);
    }
  }
  async show(id: number): Promise<IUserWithPassword> {
    try {
      const connection = await this.getConnection();
      const QUERY = "SELECT * FROM users WHERE id = $1";
      const results = await connection.query(QUERY, [id]);
      connection.release();
      return mapDbUserToInterface(results.rows[0]);
    } catch (error: unknown) {
      throw new Error(`Unable to get user with id=${id}: ${error}`);
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const connection = await this.getConnection();
      const QUERY = "DELETE FROM users WHERE id = $1";
      await connection.query(QUERY, [id]);
      connection.release();
      return;
    } catch (error: unknown) {
      throw new Error(`Unable to delete user with id=${id}: ${error}`);
    }
  }
  async create(data: IUserWithPassword): Promise<IUserWithReqID> {
    try {
      const connection = await this.getConnection();
      const QUERY =
        "INSERT INTO users (first_name, last_name, password_hash) VALUES ($1, $2, $3) RETURNING id, first_name, last_name";
      const hashedPassword = hashPassword(data.password);
      const results = await connection.query(QUERY, [data.firstName, data.lastName, hashedPassword]);
      connection.release();
      return mapDbUserToInterface(results.rows[0]);
    } catch (error: unknown) {
      throw new Error(`Unable to create user with data = ${JSON.stringify(data, null, JSON_SPACE_NUM)}: ${error}`);
    }
  }
}
