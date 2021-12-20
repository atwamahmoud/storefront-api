import supertest from "supertest";
import {app} from "../..";
import IProduct from "../../interfaces/Product";
import {HttpCodes} from "../../utils/constants";

const request = supertest(app);
const OCT = 8;
const DBL_OCT = 16;

const user = {
  id: Date.now().toString(OCT),
  password: Date.now().toString(DBL_OCT),
  first_name: "my_first_name",
  last_name: "my_last_name",
};
const product: IProduct = {
  name: "My Product",
  price: 123,
  category: "My Category",
};

let auth_header: string;
beforeAll(async () => {
  await request.post("/users").send({user});
  const auth_response = await request.post("/auth").send({id: user.id, password: user.password});
  auth_header = `Bearer ${auth_response.body.token}`;
});

describe("Test /products endpoint returns 404 for methods other than POST & GET", () => {
  it("Returns 404 for PUT", async () => {
    const response = await request.put("/products");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for DELETE", async () => {
    const response = await request.delete("/products");
    expect(response.status).toBe(HttpCodes.not_found);
  });
  it("Returns 404 for PATCH", async () => {
    const response = await request.patch("/products");
    expect(response.status).toBe(HttpCodes.not_found);
  });
});

describe("Test /products endpoint returns 400 for malformed data", () => {
  it("POST Returns 400 when product name is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/products")
        .send({product: {...product, name: ""}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, name: 1}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, name: undefined}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, name: null}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when product category is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/products")
        .send({product: {...product, category: ""}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, category: 1}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, category: null}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when product price is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/products")
        .send({product: {...product, price: ""}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, price: -1}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, price: undefined}})
        .set("Authorization", auth_header),
      request
        .post("/products")
        .send({product: {...product, price: null}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
});

describe("Test /products POST endpoint", () => {
  it("Returns 201 when data is correct & returns id", async () => {
    const response = await request.post("/products").send({product}).set("Authorization", auth_header);
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toBeGreaterThanOrEqual(1);
    product.id = response.body.id;
    expect(response.statusCode).toEqual(HttpCodes.created);
  });
});
describe("Test /products/:id GET endpoint", () => {
  let id: number;

  it("Returns 200", async () => {
    const response = await request.get(`/products/${product.id}`);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns correct product", async () => {
    const response = await request.get(`/products/${product.id}`);
    expect(response.body).toEqual(product);
  });
});
describe("Test /products GET endpoint", () => {
  it("Returns 200", async () => {
    const response = await request.get(`/products`);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns correct product", async () => {
    const response = await request.get(`/products`);

    expect(Array.isArray(response.body)).toBeTrue();
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const last_created_product = response.body.pop()!;

    expect(last_created_product.id).toEqual(product.id);
    expect(last_created_product.name).toEqual(product.name);
    expect(last_created_product.price).toEqual(product.price);
    expect(last_created_product.category).toEqual(product.category);
  });
});
