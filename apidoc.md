<a name="top"></a>
# Acme project v0.0.0

REST Api

# Table of contents

- [Authentication](#Authentication)
  - [Generate a JWT](#Generate-a-JWT)
- [Orders](#Orders)
  - [Create Order](#Create-Order)
  - [Get Order](#Get-Order)
  - [Get user orders](#Get-user-orders)
- [Products](#Products)
  - [Create product](#Create-product)
  - [Get product](#Get-product)
  - [Get products](#Get-products)
- [Users](#Users)
  - [Create user](#Create-user)
  - [Get user](#Get-user)
  - [Request all users](#Request-all-users)

___


# <a name='Authentication'></a> Authentication

## <a name='Generate-a-JWT'></a> Generate a JWT
[Back to top](#top)

```
POST /auth
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>User Id</p> |
| password | `String` | <p>User password</p> |

### Examples
Example usage:

```js
fetch("/auth", {
  method: "POST",
  body: JSON.stringify({
    id: "m_atwa",
    password: "test_password",
  })
})
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| token | `String` | <p>JWT to be used for authentication required endpoints.</p> |

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| InvalidCredentials |  | <p>The user id or password are invalid</p> |
| InvalidData |  | <p>Received malformed data</p> |

### Error response example

#### Error response example - `Invalid credentials example:`

```json
HTTP/1.1 401 Unauthorized
{
  "error": "Invalid username or password"
}
```

#### Error response example - `Malformed data example:`

```string
HTTP/1.1 400 Bad request
Invalid password, please check the docs!
```

# <a name='Orders'></a> Orders

## <a name='Create-Order'></a> Create Order
[Back to top](#top)

```
POST /orders
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| order. | `Object` |  |
| order.status | `String` | **optional** <p>status of order</p>_Default value: ACTIVE_<br>_Allowed values: "ACTIVE","COMPLETE"_ |
| order.products | `Object[]` | <p>products contained within this order</p> |
| order.products.id | `Number` | <p>id of product</p> |
| order.products.qty | `Number` | <p>qty of product</p> |

### Examples
Example usage:

```js
fetch("order", {
  method: "POST",
  body: JSON.stringify({
    order: {
      status: "ACTIVE",
      products: [
        id: 3,
        qty: 4,
      ],
    }
  })
})
```

### Parameters examples
`json` - Success-Response:

```json
{
  status: "ACTIVE",
  products: [
    id: 3,
    qty: 4,
  ],
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

## <a name='Get-Order'></a> Get Order
[Back to top](#top)

```
GET /orders/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>Order Id</p> |

### Examples
Example usage:

```js
fetch("order/1")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| order. | `Object` |  |
| order.id | `Number` | <p>id of order.</p> |
| order.status | `String` | <p>status of order</p> |
| order.user_id | `String` | <p>user_id of order</p> |
| order.products | `Object[]` | <p>products contained within this order</p> |
| order.products.id | `Number` | <p>id of product</p> |
| order.products.qty | `Number` | <p>qty of product</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
  id: 1,
  status: "ACTIVE",
  user_id: "m_atwa",
  products: [
    id: 3,
    qty: 4,
  ],
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

## <a name='Get-user-orders'></a> Get user orders
[Back to top](#top)

```
GET /orders/user/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>User Id</p> |

### Examples
Example usage:

```js
fetch("orders/user/m_atwa")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| orders. | `Object[]` |  |
| orders.id | `Number` | <p>id of order.</p> |
| orders.status | `String` | <p>status of order</p> |
| orders.user_id | `String` | <p>user_id of order</p> |
| orders.products | `Object[]` | <p>products contained within this order</p> |
| orders.products.id | `Number` | <p>id of product</p> |
| orders.products.qty | `Number` | <p>qty of product</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
[
  {
    id: 1,
    status: "ACTIVE",
    user_id: "m_atwa",
    products: [
      id: 3,
      qty: 4,
    ],
  }
]
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

# <a name='Products'></a> Products

## <a name='Create-product'></a> Create product
[Back to top](#top)

```
POST /products
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| product. | `Object` |  |
| product.price | `Number` | <p>price of product.</p> |
| product.name | `String` | <p>name of product</p> |
| product.category | `String` | **optional** <p>product category</p>_Default value: null_<br> |

### Examples
Example usage:

```js
fetch("order", {
  method: "POST",
  body: JSON.stringify({
    product: {
      name: "Headphones",
      price: 199.9,
    }
  })
})
```

### Parameters examples
`json` - Success-Request:

```json
{
  product: {
  name: "Headphones",
  price: 199.9,
  }
}
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| product. | `Object` |  |
| product.id | `Number` | <p>id of product.</p> |
| product.price | `Number` | <p>price of product.</p> |
| product.name | `String` | <p>name of product</p> |
| product.category | `String|null` | <p>product category</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
  name: "Headphones",
  price: 199.9,
  id: 1,
  category: null
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

## <a name='Get-product'></a> Get product
[Back to top](#top)

```
GET /products/:id
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>product Id</p> |

### Examples
Example usage:

```js
fetch("/products/1")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| product. | `Object` |  |
| product.id | `Number` | <p>id of product.</p> |
| product.price | `Number` | <p>price of product.</p> |
| product.name | `String` | <p>name of product</p> |
| product.category | `String|null` | <p>product category</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
  id: 1,
  name: "Headphones",
  price: 199.9,
}
```

## <a name='Get-products'></a> Get products
[Back to top](#top)

```
GET /products/
```

### Examples
Example usage:

```js
fetch("/products")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| products. | `Object[]` |  |
| products.id | `Number` | <p>id of product.</p> |
| products.name | `String` | <p>name of product</p> |
| products.category | `String|null` | <p>category of product</p> |
| products.price | `Number` | <p>price of product</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
[{
  id: 1,
  name: "Headphones",
  price: 199.9,
}]
```

# <a name='Users'></a> Users

## <a name='Create-user'></a> Create user
[Back to top](#top)

> Please note that returning the password_hash is meant for clarification for the reviewer it should never be sent to public


```
POST /users
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user. | `Object` |  |
| user.id | `String` | <p>user id (used for login).</p> |
| user.first_name | `String` | <p>User's first name</p> |
| user.last_name | `String` | <p>User's last name</p> |
| user.password | `String` | <p>User's password</p> |

### Examples
Example usage:

```js
fetch("users", {
  method: "POST",
  body: JSON.stringify({
    user: {
      first_name: "Mahmoud",
      last_name: "Mahmoud",
      password: "my_password",
      id: "m_atwa",
    }
  })
})
```

### Parameters examples
`json` - Success-Request:

```json
{
  user: {
  first_name: "Mahmoud",
  last_name: "Mahmoud",
  password: "my_password",
  id: "m_atwa",
  }
}
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| product. | `Object` |  |
| product.id | `Number` | <p>id of product.</p> |
| product.price | `Number` | <p>price of product.</p> |
| product.name | `String` | <p>name of product</p> |
| product.category | `String|null` | <p>product category</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
  user: {
    first_name: "Mahmoud",
    last_name: "Mahmoud",
    password_hash: "hashed__password", // Returned for testing purposes only should never be sent to public!
    id: "m_atwa",
  }
}
```

#### Success response example - `Error-Response:`

```json
HTTP/1.1 400 Bad request
   {
     error: "Duplicate User ID"
   }
```

## <a name='Get-user'></a> Get user
[Back to top](#top)

```
GET /users/:id
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Parameters - `Parameter`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>product Id</p> |

### Examples
Example usage:

```js
fetch("/users/m_atwa")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user. | `Object` |  |
| user.id | `String` | <p>id of user.</p> |
| user.first_name | `String` | <p>first name.</p> |
| user.last_name | `String` | <p>last name</p> |
| user.password_hash | `String` | <p>user's password hash</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
{
  "id": "m_atwa",
  "first_name": "Mahmoud",
  "last_name": "Atwa",
  "password_hash": "....",
}
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

## <a name='Request-all-users'></a> Request all users
[Back to top](#top)

```
GET /users
```

### Headers - `Header`

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| authorization | `String` | <p>Users jwt obtained from /auth endpoint.</p> |

### Header examples
Header-Example:

```json
{
  "Authorization": "Bearer {token}"
}
```

### Examples
Example usage:

```js
fetch("/users/m_atwa")
```

### Success response

#### Success response - `Success 200`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| users | `Object[]` | <p>Array of users</p> |
| users.id | `String` | <p>id of user.</p> |
| users.first_name | `String` | <p>first name.</p> |
| users.last_name | `String` | <p>last name</p> |
| users.password_hash | `String` | <p>user's password hash</p> |

### Success response example

#### Success response example - `Success-Response:`

```json
[{
  "id": "m_atwa",
  "first_name": "Mahmoud",
  "last_name": "Atwa",
  "password_hash": "....",
}]
```

### Error response

#### Error response - `Error 4xx`

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Unauthorized |  | <p>The invalid or missing token.</p> |

### Error response example

#### Error response example - `UnauthorizedError-Reponse`

```json
HTTP/1.1 400 Bad request
Invalid auth token!
```

