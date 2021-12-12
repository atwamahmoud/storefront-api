export default interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export type IUserWithReqID = Omit<IUserWithPassword, "id"> & {id: number};
