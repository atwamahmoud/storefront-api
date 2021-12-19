import IOrderProductRelation from "../../interfaces/OrderProduct";
import OrdersStore from "../../models/order";
import ProductOrderStore from "../../models/orderProductRelation";
import ProductsStore from "../../models/product";
import UsersStore from "../../models/user";
import {OrderStatus} from "../../utils/constants";

const store = new ProductOrderStore();

describe("Product Orders Model", () => {
  // Create a Product & an order
  let product_order: IOrderProductRelation;
  beforeAll(async () => {
    const user = await new UsersStore().create({
      last_name: "Last Name",
      first_name: "First Name",
      password_hash: "password_hash",
      id: "product_order_user",
    });
    const order = await new OrdersStore().create({
      status: OrderStatus.active,
      user_id: user.id,
    });
    const product = await new ProductsStore().create({
      name: "Product",
      price: 12.3,
    });
    product_order = {
      product_id: product.id,
      order_id: order.id,
      qty: 5,
    };
  });
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
  it("Create method should add an product entity", async () => {
    const result = await store.create(product_order);
    expect(result).toEqual({...product_order});
  });
  it("Show method should get the product order with specified ids", async () => {
    const result = await store.show(product_order.order_id, product_order.product_id);
    expect(result).toEqual({...product_order});
  });
  it("index method should get all product orders", async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
    expect(result).toEqual([{...product_order}]);
  });
  it("delete method should delete product order", async () => {
    await store.delete(product_order.order_id, product_order.product_id);
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
