import {IUserWithPassword} from "../../interfaces/User";
import UsersStore from "../../models/user";

const store = new UsersStore();

describe("User Model", () => {
  const user: IUserWithPassword = {
    firstName: "First Name",
    lastName: "Last Name",
    password: "test_password",
  };
  let id: number;
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("Should have a show method", () => {
    expect(store.show).toBeDefined();
  });
  it("Should have a create method", () => {
    expect(store.create).toBeDefined();
  });
  it("Should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });
  it("Create method should add a user", async () => {
    const result = await store.create(user);
    expect(result.firstName).toEqual(user.firstName);
    expect(result.lastName).toEqual(user.lastName);
    expect(result.id).toBeTruthy();
    user.id = result.id;
    id = result.id;
  });
  it("Show method should get the user with specified id", async () => {
    const result = await store.show(id);
    expect(result.firstName).toEqual(user.firstName);
    expect(result.lastName).toEqual(user.lastName);
    expect(result.id).toEqual(user.id);
  });
  it("Create method should hash the user password", async () => {
    const result = await store.show(id);
    expect(result.password).not.toEqual(user.password);
    expect(result.password).not.toBeUndefined();
    expect(result.password).toBeTruthy();
  });
  it("index method should get all users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(id);
  });
  it("delete method should delete user with specified id", async () => {
    await store.create(user);
    await store.delete(id);
    const result = await store.index();
    expect(result.length).toEqual(id);
    expect(result[id - 1]).toEqual(
      jasmine.objectContaining({
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    );
    expect(result[id - 1].id).not.toEqual(id);
  });
});
