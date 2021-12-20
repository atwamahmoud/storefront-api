import {Router} from "express";
import {auth_middleware} from "../middlewares/auth";
import {id_validation_middleware} from "../middlewares/idValidator";
import {product_validation_middleware} from "../middlewares/productValidator";
import ProductsStore from "../models/product";
import {HttpCodes} from "../utils/constants";

const products_store = new ProductsStore();
const products_router = Router();

/**
 * @api {get} /products/ Get products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {Object[]} products.
 * @apiSuccess {Number} products.id id of product.
 * @apiSuccess {String} products.name name of product
 * @apiSuccess {String|null} products.category category of product
 * @apiSuccess {Number} products.price price of product
 *
 * @apiSuccessExample {json} Success-Response:
 *    [{
 *      id: 1,
 *      name: "Headphones",
 *      price: 199.9,
 *    }]
 *
 * @apiExample {js} Example usage:
 *  fetch("/products")
 */
products_router.get("/", async (req, res) => {
  const products = await products_store.index();
  res.status(HttpCodes.ok).send(products);
});

/**
 * @api {get} /products/:id Get product
 * @apiName GetProductDetails
 * @apiGroup Products
 *
 * @apiParam {String} id  product Id
 *
 * @apiSuccess {Object} product.
 * @apiSuccess {Number} product.id id of product.
 * @apiSuccess {Number} product.price price of product.
 * @apiSuccess {String} product.name name of product
 * @apiSuccess {String|null} product.category product category
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      id: 1,
 *      name: "Headphones",
 *      price: 199.9,
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("/products/1")
 */
products_router.get("/:id", id_validation_middleware, async (req, res) => {
  const number_id = parseInt(req.params.id);
  const product = await products_store.show(number_id);
  if (!product) {
    res.status(HttpCodes.not_found).end();
    return;
  }
  res.status(HttpCodes.ok).send(product);
});

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Products
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiParam {Object} product.
 * @apiParam {Number} product.price price of product.
 * @apiParam {String} product.name name of product
 * @apiParam {String} [product.category=null] product category
 *
 * @apiSuccess {Object} product.
 * @apiSuccess {Number} product.id id of product.
 * @apiSuccess {Number} product.price price of product.
 * @apiSuccess {String} product.name name of product
 * @apiSuccess {String|null} product.category product category
 *
 *
 * @apiParamExample {json} Success-Request:
 *    {
 *      product: {
 *      name: "Headphones",
 *      price: 199.9,
 *      }
 *    }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      name: "Headphones",
 *      price: 199.9,
 *      id: 1,
 *      category: null
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("order", {
 *    method: "POST",
 *    body: JSON.stringify({
 *      product: {
 *        name: "Headphones",
 *        price: 199.9,
 *      }
 *    })
 *  })
 */
products_router.post("/", auth_middleware, product_validation_middleware, async (req, res) => {
  const {product} = req.body;
  const created_product = await products_store.create(product);
  res.status(HttpCodes.created).send({...created_product});
});

export default products_router;
