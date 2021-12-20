import supertest from "supertest";
import {app} from "../..";
import IProduct from "../../interfaces/Product";
import {HttpCodes, OrderStatus} from "../../utils/constants";

const request = supertest(app);
const HEX = 16;
const DBL_HEX = 32;

const user = {
  id: Date.now().toString(HEX),
  password: Date.now().toString(DBL_HEX),
  first_name: "my_first_name",
  last_name: "my_last_name",
};
const product: IProduct = {
  name: "My Product",
  price: 123,
  category: "My Category",
};
const order = {
  id: -1,
  user_id: user.id,
  products: [
    {
      id: product.id,
      qty: 2,
    },
  ],
  status: OrderStatus.active,
};

let auth_header: string;
beforeAll(async () => {
  await request.post("/users").send({user});
  const auth_response = await request.post("/auth").send({id: user.id, password: user.password});
  auth_header = `Bearer ${auth_response.body.token}`;
  const product_response = await request.post("/products").send({product}).set("Authorization", auth_header);
  product.id = product_response.body.id;
  order.products[0].id = product.id;
});

describe("Test /orders endpoint returns 404 for methods other than POST & GET", () => {
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

describe("Test /orders endpoint returns 400 for malformed data", () => {
  it("POST Returns 400 when order status is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/orders")
        .send({order: {...order, status: ""}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, status: 1}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, status: null}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, status: "my_status"}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when products array is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/orders")
        .send({order: {...order, products: ""}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: 1}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: undefined}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: null}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: []}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: -1}]}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when product qty is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: -1}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: 0}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: 0.5}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: ""}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: undefined}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], qty: null}]}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
  it("POST Returns 400 when product id is invalid", async () => {
    const responses = await Promise.all([
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: -1}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: 0}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: 0.5}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: ""}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: undefined}]}})
        .set("Authorization", auth_header),
      request
        .post("/orders")
        .send({order: {...order, products: [{...order.products[0], id: null}]}})
        .set("Authorization", auth_header),
    ]);
    expect(responses.map((resp) => resp.statusCode)).toEqual(new Array(responses.length).fill(HttpCodes.bad_request));
  });
});

describe("Test /orders POST endpoint", () => {
  it("Returns 201 when data is correct & returns id", async () => {
    const response = await request.post("/orders").send({order}).set("Authorization", auth_header);
    expect(response.body.id).toBeDefined();
    expect(response.body.id).toBeGreaterThanOrEqual(1);
    order.id = response.body.id;
    expect(response.statusCode).toEqual(HttpCodes.created);
  });
});

describe("Test /order/:id GET endpoint", () => {
  it("Returns 200", async () => {
    const response = await request.get(`/orders/${order.id}`).set("Authorization", auth_header);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns 404 for non existing orders", async () => {
    const response = await request.get(`/orders/32146`).set("Authorization", auth_header);
    expect(response.statusCode).toEqual(HttpCodes.not_found);
  });
  it("Returns correct order", async () => {
    const response = await request.get(`/orders/${order.id}`).set("Authorization", auth_header);
    expect(response.body).toEqual(order);
  });
});
describe("Test /orders/user/:user_id GET endpoint", () => {
  beforeAll(async () => {
    const response = await request.get(`/orders/users/${user.id}`).set("Authorization", auth_header);
    console.log(response.text);
  });
  it("Returns 200", async () => {
    const response = await request.get(`/orders/user/${user.id}`).set("Authorization", auth_header);
    expect(response.statusCode).toEqual(HttpCodes.ok);
  });
  it("Returns correct product", async () => {
    const response = await request.get(`/orders/user/${user.id}`).set("Authorization", auth_header);

    expect(Array.isArray(response.body)).toBeTrue();
    expect(response.body.length).toBeGreaterThanOrEqual(1);

    const last_created_order = response.body.pop()!;

    expect(last_created_order.id).toEqual(order.id);
    expect(last_created_order.status).toEqual(order.status);
    expect(last_created_order.user_id).toEqual(order.user_id);
    expect(last_created_order.products).toEqual(order.products);
  });
});
