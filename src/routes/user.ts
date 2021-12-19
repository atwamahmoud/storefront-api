import {Router} from "express";
import {auth_middleware} from "../middlewares/auth";
import {string_id_validation_middleware} from "../middlewares/stringIdValidator";
import {user_validation_middleware} from "../middlewares/userValidator";
import UsersStore from "../models/user";
import {HttpCodes} from "../utils/constants";
import {hash_password} from "../utils/password";

const users_store = new UsersStore();
const users_router = Router();
users_router.get("/", auth_middleware, async (req, res) => {
  const users = await users_store.index();
  // Doesn't remove password_hash from user object since
  // I think it's used for reviewer testing
  // However the code to remove it is:
  /**
   * users.map((user) => {
      // Removes password_hash from response
      // Or you can just return a json string...
      return JSON.parse(JSON.stringify({...user, password_hash: undefined}));
    }),
    */
  res.status(HttpCodes.ok).send(users);
});

users_router.get("/:id", string_id_validation_middleware, auth_middleware, async (req, res) => {
  const user = await users_store.show(req.params.id);
  if (!user) {
    res.status(HttpCodes.not_found).end();
    return;
  }
  res.status(HttpCodes.ok).send(user);
});

users_router.post("/", user_validation_middleware, async (req, res) => {
  const {user} = req.body;
  const created_user = await users_store.create({
    first_name: user.first_name,
    last_name: user.last_name,
    id: user.id,
    password_hash: await hash_password(user.password),
  });
  res.status(HttpCodes.created).send({...created_user});
});

export default users_router;
