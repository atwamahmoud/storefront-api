import IOrder from "../../interfaces/Order";
import IUser, {IUserWithReqID} from "../../interfaces/User";
import OrdersStore from "../../models/order";
import UsersStore from "../../models/user";
import {OrderStatus} from "../../utils/constants";

const store = new OrdersStore();

describe("Order Model", () => {
  let order: IOrder;
  let user: IUserWithReqID;
  beforeAll(async () => {
    user = await new UsersStore().create({
      lastName: "Last Name",
      firstName: "First Name",
      password: "password",
    });
    order = {
      status: OrderStatus.active,
      userId: user.id,
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
  it("Create method should add an order", async () => {
    const result = await store.create(order);
    expect(result).toEqual({...order, id: 1});
  });
  it("Show method should get the order with specified id", async () => {
    const result = await store.show(1);
    expect(result).toEqual({...order, id: 1});
  });
  it("index method should get all orders", async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
    expect(result).toEqual([{...order, id: 1}]);
  });
  it("delete method should delete order with specified id", async () => {
    await store.create(order);
    await store.delete(1);
    const result = await store.index();
    expect(result).toEqual([{...order, id: 2}]);
  });
});
