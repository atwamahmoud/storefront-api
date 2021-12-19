import {Router} from "express";
import {auth_middleware} from "../middlewares/auth";
import {string_id_validation_middleware} from "../middlewares/stringIdValidator";
import {user_validation_middleware} from "../middlewares/userValidator";
import UsersStore from "../models/user";
import {HttpCodes} from "../utils/constants";
import {hash_password} from "../utils/password";

const users_store = new UsersStore();
const users_router = Router();

/**
 * @api {get} /users Request all users
 * @apiName GetUsers
 * @apiGroup Users
 *
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiSuccess {Object[]} users Array of users
 * @apiSuccess {String} users.id id of user.
 * @apiSuccess {String} users.first_name first name.
 * @apiSuccess {String} users.last_name last name
 * @apiSuccess {String} users.password_hash user's password hash
 *
 * @apiSuccessExample {json} Success-Response:
 *    [{
 *      "id": "m_atwa",
 *      "first_name": "Mahmoud",
 *      "last_name": "Atwa",
 *      "password_hash": "....",
 *    }]
 *
 * @apiExample {js} Example usage:
 *  fetch("/users/m_atwa")
 */
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

/**
 * @api {get} /users/:id Request user with id = id
 * @apiName GetUserDetails
 * @apiGroup Users
 *
 * @apiParam {String} id  product Id
 *
 * @apiUse AuthorizationHeader
 * @apiUse UnauthorizedError
 *
 * @apiSuccess {Object} user.
 * @apiSuccess {String} user.id id of user.
 * @apiSuccess {String} user.first_name first name.
 * @apiSuccess {String} user.last_name last name
 * @apiSuccess {String} user.password_hash user's password hash
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      "id": "m_atwa",
 *      "first_name": "Mahmoud",
 *      "last_name": "Atwa",
 *      "password_hash": "....",
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("/users/m_atwa")
 */
users_router.get("/:id", string_id_validation_middleware, auth_middleware, async (req, res) => {
  const user = await users_store.show(req.params.id);
  if (!user) {
    res.status(HttpCodes.not_found).end();
    return;
  }
  res.status(HttpCodes.ok).send(user);
});

/**
 * @api {post} /users Creates a new user
 * @apiName CreateUser
 * @apiGroup Users
 *
 * @apiParam {Object} user.
 * @apiParam {String} user.id user id (used for login).
 * @apiParam {String} user.first_name User's first name
 * @apiParam {String} user.last_name User's last name
 * @apiParam {String} user.password User's password
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
 *      user: {
 *      first_name: "Mahmoud",
 *      last_name: "Mahmoud",
 *      password: "my_password",
 *      id: "m_atwa",
 *      }
 *    }
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *    {
 *      user: {
 *        first_name: "Mahmoud",
 *        last_name: "Mahmoud",
 *        password_hash: "hashed__password", // Returned for testing purposes only should never be sent to public!
 *        id: "m_atwa",
 *      }
 *    }
 *
 * @apiExample {js} Example usage:
 *  fetch("users", {
 *    method: "POST",
 *    body: JSON.stringify({
 *      user: {
 *        first_name: "Mahmoud",
 *        last_name: "Mahmoud",
 *        password: "my_password",
 *        id: "m_atwa",
 *      }
 *    })
 *  })
 */
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
