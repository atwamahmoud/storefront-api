import {Router} from "express";
import {auth_middleware} from "../middlewares/auth";
import {id_validation_middleware} from "../middlewares/idValidator";
import {product_validation_middleware} from "../middlewares/productValidator";
import ProductsStore from "../models/product";
import {HttpCodes} from "../utils/constants";

const products_store = new ProductsStore();
const products_router = Router();

products_router.get("/", async (req, res) => {
  const products = await products_store.index();
  res.status(HttpCodes.ok).send(products);
});

products_router.get("/:id", id_validation_middleware, async (req, res) => {
  const number_id = parseInt(req.params.id);
  const product = await products_store.show(number_id);
  if (!product) {
    res.status(HttpCodes.not_found).end();
    return;
  }
  res.status(HttpCodes.ok).send(product);
});

products_router.post("/", auth_middleware, product_validation_middleware, async (req, res) => {
  const {product} = req.body;
  const created_product = await products_store.create(product);
  res.status(HttpCodes.created).send({...created_product});
});

export default products_router;
