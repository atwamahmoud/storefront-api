import supertest from "supertest";
import {app} from "../..";
import {HttpCodes} from "../../utils/constants";

const request = supertest(app);
const HEX = 16;
const DBL_HEX = 32;

const user = {
  id: Date.now().toString(HEX),
  password: Date.now().toString(DBL_HEX),
  first_name: "my_first_name",
  last_name: "my_last_name",
};

describe("Test /users endpoint returns 404 for methods other than POST & GET", () => {
  it("Returns 404 for PUT", async () => {
    const response = await request.put("/users");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for DELETE", async () => {
    const response = await request.delete("/users");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for PATCH", async () => {
    const response = await request.patch("/users");
    expect(response.status).toBe(HttpCodes.not_found);
  });
});

describe("Test /users endpoint returns 400 for malformed data", () => {
  it("POST Returns 400 when user id is invalid", async () => {
    const responses = await Promise.all([
      request.post("/users").send({user: {...user, id: ""}}),
      request.post("/users").send({user: {...user, id: 1}}),
      request.post("/users").send({user: {...user, id: undefined}}),
      request.post("/users").send({user: {...user, id: null}}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when password is invalid", async () => {
    const responses = await Promise.all([
      request.post("/users").send({user: {...user, password: ""}}),
      request.post("/users").send({user: {...user, password: 1}}),
      request.post("/users").send({user: {...user, password: undefined}}),
      request.post("/users").send({user: {...user, password: null}}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when first_name is invalid", async () => {
    const responses = await Promise.all([
      request.post("/users").send({user: {...user, first_name: ""}}),
      request.post("/users").send({user: {...user, first_name: 1}}),
      request.post("/users").send({user: {...user, first_name: undefined}}),
      request.post("/users").send({user: {...user, first_name: null}}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when last_name is invalid", async () => {
    const responses = await Promise.all([
      request.post("/users").send({user: {...user, last_name: ""}}),
      request.post("/users").send({user: {...user, last_name: 1}}),
      request.post("/users").send({user: {...user, last_name: undefined}}),
      request.post("/users").send({user: {...user, last_name: null}}),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
});

describe("Test /users POST endpoint", () => {
  it("Returns 201 when data is correct", async () => {
    const response = await request.post("/users").send({user});
    expect(response.statusCode).toEqual(HttpCodes.created);
  });
  it("Can login after sign up", async () => {
    const response = await request.post("/auth").send({id: user.id, password: user.password});
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns 400 when id is duplicate", async () => {
    const response = await request.post("/users").send({user});
    expect(response.statusCode).toEqual(HttpCodes.bad_request);
  });
});

describe("Test /users/:id GET endpoint", () => {
  let auth_header: string;
  beforeAll(async () => {
    const response = await request.post("/auth").send({id: user.id, password: user.password});
    auth_header = `Bearer ${response.body.token}`;
  });
  it("Returns 200", async () => {
    const response = await request.get(`/users/${user.id}`).set("Authorization", auth_header);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns correct user details", async () => {
    const response = await request.get(`/users/${user.id}`).set("Authorization", auth_header);
    expect(response.body.first_name).toEqual(user.first_name);
    expect(response.body.last_name).toEqual(user.last_name);
    expect(response.body.id).toEqual(user.id);
    expect(response.body.password_hash).toBeDefined();
  });
});
describe("Test /users GET endpoint", () => {
  let auth_header: string;
  beforeAll(async () => {
    const response = await request.post("/auth").send({id: user.id, password: user.password});
    auth_header = `Bearer ${response.body.token}`;
  });
  it("Returns 200", async () => {
    const response = await request.get(`/users`).set("Authorization", auth_header);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns List of user", async () => {
    const response = await request.get(`/users`).set("Authorization", auth_header);

    expect(Array.isArray(response.body)).toBeTrue();
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const last_created_user = response.body.pop()!;

    expect(last_created_user.first_name).toEqual(user.first_name);
    expect(last_created_user.last_name).toEqual(user.last_name);
    expect(last_created_user.id).toEqual(user.id);
  });
});
