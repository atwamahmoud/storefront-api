import {Router} from "express";
import UsersStore from "../models/user";
import {HttpCodes} from "../utils/constants";
import {compare_password} from "../utils/password";
import jwt from "jsonwebtoken";
import {get_private_key} from "../utils/getPrivateKey";

const users_store = new UsersStore();
const auth_router = Router();
/**
 * @apiDefine AuthorizationHeader
 *
 * @apiHeader {String} authorization Users jwt obtained from /auth endpoint.
 *
 * @apiHeaderExample {json} Header-Example:
 *  {
 *    "Authorization": "Bearer {token}"
 *  }
 */
/**
 * @apiDefine UnauthorizedError
 *
 * @apiError Unauthorized The invalid or missing token.
 *
 * @apiErrorExample UnauthorizedError-Reponse
 *  HTTP/1.1 400 Bad request
 *  Invalid auth token!
 */
/**
 * @api {post} /auth Generate a JWT
 * @apiName Authenticate
 * @apiGroup Authentication
 *
 * @apiParam {String} id  User Id
 * @apiParam {String} password  User password
 *
 * @apiSuccess {String} token  JWT to be used for authentication required endpoints.
 * @apiError InvalidCredentials The user id or password are invalid
 * @apiErrorExample {json} Invalid credentials example:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "error": "Invalid username or password"
 *  }
 *
 * @apiError InvalidData Received malformed data
 * @apiErrorExample {string} Malformed data example:
 *  HTTP/1.1 400 Bad request
 *  Invalid password, please check the docs!
 *
 * @apiExample {js} Example usage:
 *  fetch("/auth", {
 *    method: "POST",
 *    body: JSON.stringify({
 *      id: "m_atwa",
 *      password: "test_password",
 *    })
 *  })
 */
auth_router.post("/", async (req, res) => {
  const user = await users_store.show(req.body.id);
  const ERROR = {error: "Invalid username or password"};
  if (!user) {
    return res.status(HttpCodes.unauthorized).end(ERROR);
  }
  const is_same_password = await compare_password(user?.password_hash, req.body.password);
  if (!is_same_password) {
    return res.status(HttpCodes.unauthorized).end(ERROR);
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
