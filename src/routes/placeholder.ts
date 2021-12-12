import {Router} from "express";
import {createSVGString} from "../lib/svgString";
import {colorValidatorMiddleware} from "../middlewares/colorValidator";
import {dimensionValidatorMiddleware} from "../middlewares/dimensionsValidator";
import {HttpCodes} from "../utils/constants";

const productsRouter = Router();

productsRouter.get("/", (req, res) => {
  res.status(HttpCodes.ok).send([]);
});
productsRouter.get("/:id", (req, res) => {
  res.status(HttpCodes.ok).send({
    id: req.params.id,
  });
});
productsRouter.post("/", (req, res) => {
  // eslint-disable-next-line no-magic-numbers
  const ProductId = Math.random() * 100;
  res.status(HttpCodes.created).send({
    id: Math.round(ProductId),
  });
});

export default productsRouter;
