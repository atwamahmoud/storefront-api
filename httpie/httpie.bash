http -v POST http://localhost:8080/users user:='{"id": "m_atwa", "first_name": "Mahmoud", "last_name": "Atwa", "password": "test_password"}'
http -v POST http://localhost:8080/auth id=m_atwa password=test_password
http -v GET http://localhost:8080/users/m_atwa 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1fYXR3YSIsImZpcnN0X25hbWUiOiJNYWhtb3VkIiwibGFzdF9uYW1lIjoiQXR3YSIsImlhdCI6MTYzOTkyNzAzOSwiZXhwIjoxNjM5OTMwNjM5fQ.TlaXk4HkdZL61x9KWgEHhalE2QpeQcwmi_Jc8lVxI7M'
http -v POST http://localhost:8080/products product:='{"name": "Product 1", "price":123.3}' 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1fYXR3YSIsImZpcnN0X25hbWUiOiJNYWhtb3VkIiwibGFzdF9uYW1lIjoiQXR3YSIsImlhdCI6MTYzOTkyNzAzOSwiZXhwIjoxNjM5OTMwNjM5fQ.TlaXk4HkdZL61x9KWgEHhalE2QpeQcwmi_Jc8lVxI7M'
http -v GET http://localhost:8080/products
http -v GET http://localhost:8080/products/1
http -v POST http://localhost:8080/orders order:='{"products": [{"id": 1, "qty": 3}], "status": "ACTIVE"}' 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1fYXR3YSIsImZpcnN0X25hbWUiOiJNYWhtb3VkIiwibGFzdF9uYW1lIjoiQXR3YSIsImlhdCI6MTYzOTkyNzAzOSwiZXhwIjoxNjM5OTMwNjM5fQ.TlaXk4HkdZL61x9KWgEHhalE2QpeQcwmi_Jc8lVxI7M'
http -v GET http://localhost:8080/orders/2 'Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im1fYXR3YSIsImZpcnN0X25hbWUiOiJNYWhtb3VkIiwibGFzdF9uYW1lIjoiQXR3YSIsImlhdCI6MTYzOTkyNzAzOSwiZXhwIjoxNjM5OTMwNjM5fQ.TlaXk4HkdZL61x9KWgEHhalE2QpeQcwmi_Jc8lVxI7M'
