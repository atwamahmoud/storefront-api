import {Router} from "express";
import UsersStore from "../models/user";
import {HttpCodes} from "../utils/constants";
import {compare_password} from "../utils/password";
import jwt from "jsonwebtoken";
import {get_private_key} from "../utils/getPrivateKey";

const users_store = new UsersStore();
const auth_router = Router();

auth_router.post("/", async (req, res) => {
  const user = await users_store.show(req.body.id);
  if (!user) {
    return res.status(HttpCodes.unauthorized).end("Invalid username or password");
  }
  const is_same_password = await compare_password(user?.password_hash, req.body.password);
  if (!is_same_password) {
    return res.status(HttpCodes.unauthorized).end("Invalid username or password");
  }
  jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    get_private_key(),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    {expiresIn: "1h"},
    (err, token) => {
      if (err || !token) {
        throw err || new Error("Got empty token!");
      }
      res.status(HttpCodes.ok).send({
        token,
      });
    },
  );
});

export default auth_router;
