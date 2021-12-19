import IUser from "../../interfaces/User";
import UsersStore from "../../models/user";

const store = new UsersStore();

describe("User Model", () => {
  const user: IUser = {
    first_name: "First Name",
    last_name: "Last Name",
    password_hash: "test_password",
    id: "user_model_id",
  };
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
    expect(result.first_name).toEqual(user.first_name);
    expect(result.last_name).toEqual(user.last_name);
    expect(result.password_hash).toEqual(user.password_hash);
    expect(result.id).toEqual(user.id);
  });
  it("Show method should get the user with specified id", async () => {
    const result = await store.show(user.id);
    expect(result?.first_name).toEqual(user.first_name);
    expect(result?.last_name).toEqual(user.last_name);
    expect(result?.password_hash).toEqual(user.password_hash);
    expect(result?.id).toEqual(user.id);
  });
  it("index method should get all users", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it("delete method should delete user with specified id", async () => {
    const id = "my_other_id";
    await store.create({...user, id: id});
    await store.delete(user.id);
    const result = await store.index();
    const last_inserted = result.pop();
    expect(last_inserted).toEqual({
      ...user,
      id,
    });
  });
});
