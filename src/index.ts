import dotenv from "dotenv";
import express from "express";
import placeholderRouter from "./routes/placeholder";
import resizeRouter from "./routes/resize";
import {ENV_FILE} from "./utils/constants";
dotenv.config({
  path: ENV_FILE,
});
console.log(process.env);
import {initDirs} from "./utils/initDir";

initDirs();

export const app = express();

app.use("/placeholder", placeholderRouter);
app.use("/resize", resizeRouter);

app.listen(process.env.PORT);
