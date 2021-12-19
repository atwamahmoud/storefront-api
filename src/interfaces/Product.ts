export default interface IProduct {
  id?: number;
  name: string;
  price: number;
  category?: string;
}

export interface IProductWithReqID extends IProduct {
  id: number;
}
