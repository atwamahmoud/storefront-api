import supertest from "supertest";
import {app} from "../..";
import UsersStore from "../../models/user";
import {HttpCodes} from "../../utils/constants";
import {hash_password} from "../../utils/password";

const request = supertest(app);
const HEX = 16;
const DBL_HEX = 32;

const user = {
  id: Date.now().toString(DBL_HEX),
  password: Date.now().toString(HEX),
};

beforeAll(async () => {
  const store = new UsersStore();
  await store.create({
    first_name: "my_first_name",
    last_name: "my_last_name",
    password_hash: await hash_password(user.password),
    id: user.id,
  });
});

describe("Test /auth endpoint returns 404 for methods other than POST", () => {
  it("Returns 404 for GET", async () => {
    const response = await request.get("/auth");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for PUT", async () => {
    const response = await request.put("/auth");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for DELETE", async () => {
    const response = await request.delete("/auth");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for PATCH", async () => {
    const response = await request.patch("/auth");
    expect(response.status).toBe(HttpCodes.not_found);
  });
});
describe("Test /auth endpoint returns 400 for malformed data", () => {
  it("Returns 400 when user id is invalid", async () => {
    const responses = await Promise.all([
      request.post("/auth").send({id: "", password: "my_password"}),
      request.post("/auth").send({id: 1, password: "my_password"}),
      request.post("/auth").send({id: undefined, password: "my_password"}),
      request.post("/auth").send({id: null, password: "my_password"}),
      request.post("/auth").send({password: "my_password"}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("Returns 400 when password is invalid", async () => {
    const responses = await Promise.all([
      request.post("/auth").send({password: "", id: "my_id"}),
      request.post("/auth").send({password: 1, id: "my_id"}),
      request.post("/auth").send({password: undefined, id: "my_id"}),
      request.post("/auth").send({password: null, id: "my_id"}),
      request.post("/auth").send({id: "my_id"}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
});

describe("Test /auth endpoint returns 401 for incorrect credentials", () => {
  it("Returns 401 when user id is incorrect", async () => {
    const response = await request.post("/auth").send({
      id: "test_id",
      password: user.password,
    });

    expect(response.statusCode).toEqual(HttpCodes.unauthorized);
  });
  it("Returns 401 when password is invalid", async () => {
    const response = await request.post("/auth").send({
      id: user.id,
      password: "my_password",
    });
    expect(response.statusCode).toEqual(HttpCodes.unauthorized);
  });
});

describe("Test /auth endpoint returns token for correct credentials", () => {
  it("Returns 200 when user id & password are correct", async () => {
    const response = await request.post("/auth").send(user);

    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns token in body when user id & password are correct", async () => {
    const response = await request.post("/auth").send(user);

    expect(response.statusCode).toEqual(HttpCodes.ok);
    expect(response.body.token).toBeDefined();
  });
});
