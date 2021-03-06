import dotenv from "dotenv";
import express from "express";
import auth_router from "./handlers/auth";
import orders_router from "./handlers/orders";
import products_router from "./handlers/products";
import users_router from "./handlers/user";
import {ENV_FILE} from "./utils/constants";
dotenv.config({
  path: ENV_FILE,
});

export const app = express();
app.use(express.json());
app.use("/orders", orders_router);
app.use("/users", users_router);
app.use("/products", products_router);
app.use("/auth", auth_router);

app.listen(process.env.PORT);
