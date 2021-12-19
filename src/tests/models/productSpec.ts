import IProduct, {IProductWithReqID} from "../../interfaces/Product";
import ProductsStore from "../../models/product";

const store = new ProductsStore();

describe("Product Model", () => {
  const product: IProduct = {
    name: "Product Name",
    price: 512,
    category: "Category",
  };
  let product_with_id: IProductWithReqID;
  beforeAll(async () => {
    // Delete all pre existing products if any!
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
  it("Create method should add a Product", async () => {
    const result = await store.create(product);
    product_with_id = {...result};
    expect(result).toEqual(jasmine.objectContaining(product_with_id));
  });
  it("Show method should get the product with specified id", async () => {
    const result = await store.show(product_with_id.id);
    expect(result).toEqual(product_with_id);
  });
  it("index method should get all products", async () => {
    const result = await store.index();
    expect(result).toEqual([product_with_id]);
  });
  it("delete method should delete product with specified id", async () => {
    await store.create(product);
    await store.delete(product_with_id.id);
    const result = await store.index();
    expect(result).toEqual([{...product, id: product_with_id.id + 1}]);
  });
});
