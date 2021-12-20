import IOrder, {IOrderWithReqID} from "../../interfaces/Order";
import IUser from "../../interfaces/User";
import OrdersStore from "../../models/order";
import UsersStore from "../../models/user";
import {OrderStatus} from "../../utils/constants";

const store = new OrdersStore();

describe("Order Model", () => {
  let order: IOrder;
  let order_with_id: IOrderWithReqID;
  let user: IUser;
  beforeAll(async () => {
    user = await new UsersStore().create({
      last_name: "Last Name",
      first_name: "First Name",
      password_hash: "password_hash",
      id: "my_user",
    });
    order = {
      status: OrderStatus.active,
      user_id: user.id,
    };
    // Delete all pre existing orders if any!
    await Promise.all((await store.index()).map(({id}) => store.delete(id)));
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
  it("Create method should add an order", async () => {
    const result = await store.create(order);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe("number");
    expect(result.id).toBeGreaterThan(0);
    order.id = result.id;
    order_with_id = result;
    expect(result).toEqual(jasmine.objectContaining({...order}));
  });
  it("Show method should get the order with specified id", async () => {
    const result = await store.show(order_with_id.id);
    expect(result).toEqual(jasmine.objectContaining({...order}));
  });
  it("index method should get all orders", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(result)).toBeTrue();
  });
  it("delete method should delete order with specified id", async () => {
    await store.create(order);
    await store.delete(order_with_id.id);
    const result = await store.index();
    expect(result).toEqual([{...order, id: order_with_id.id + 1}]);
  });
});
