import IProduct from "../../interfaces/Product";
import ProductsStore from "../../models/product";

const store = new ProductsStore();

describe("Product Model", () => {
  const product: IProduct = {
    name: "Product Name",
    price: 512,
    category: "Category",
    id: 1,
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
  it("Create method should add a Product", async () => {
    const result = await store.create(product);
    expect(result).toEqual(product);
  });
  it("Show method should get the product with specified id", async () => {
    const result = await store.show(1);
    expect(result).toEqual(product);
  });
  it("index method should get all products", async () => {
    const result = await store.index();
    expect(result).toEqual([product]);
  });
  it("delete method should delete product with specified id", async () => {
    await store.create(product);
    await store.delete(1);
    const result = await store.index();
    expect(result).toEqual([{...product, id: 2}]);
  });
});
