/* Replace with your SQL commands */
CREATE TABLE product_orders (
    product_id INT,
    order_id INT,
    CONSTRAINT fk_order
        FOREIGN KEY(order_id)
            REFERENCES orders(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_product
        FOREIGN KEY(product_id)
            REFERENCES products(id)
            ON DELETE CASCADE,
    PRIMARY KEY (product_id, order_id)
)