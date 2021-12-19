<a name="top"></a>
# storefront-api project v1.0.0

Database Schema & it's related routes


# <a name='Users'></a> Users

Used in routes of `/users/`

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `VARCHAR(255)` | <p>User Id</p> | No | Primary Key & Unique |
| password_hash | `VARCHAR(255)` | <p>User's hashed password</p> | No | N/A |
| first_name | `VARCHAR(255)` | <p>User's First name</p> | NO | N/A |
| last_name | `VARCHAR(255)` | <p>User's Last name</p> | NO | N/A |



# <a name='Products'></a> Products

Used in routes of `/products/`

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` / `INT` | <p>Product Id</p> | No | Primary Key & Unique |
| name | `VARCHAR(255)` | <p>Product name</p> | No | N/A |
| price | `FLOAT4` | <p>Product Price</p> | NO | N/A |
| category | `VARCHAR(255)` | <p>Product category</p> | Yes | N/A |

# <a name='Orders'></a> Orders

Used in routes of `/orders/`

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` / `INT` | <p>Order Id</p> | No | Primary Key & Unique |
| status | `VARCHAR(255)` | <p>Order Status</p> | No | N/A |
| user_id | `VARCHAR(255)` | <p>User ID</p> | NO | FK to `id` in [Users](#Users) |

# <a name='ProductOrders'></a> ProductOrders

Used in routes of `/orders/`

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| product_id | `INT` | <p>Product ID</p> | NO | PK & FK to `id` in [Products](#Products) |
| order_id | `INT` | <p>Order ID</p> | NO | PK & FK to `id` in [Orders](#Orders) |
| qty | `INT` | <p>User ID</p> | NO | N/A |
