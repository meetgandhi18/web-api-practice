# Web API Practice – Testing Report

## APIs Used

The following APIs from **DummyJSON** were used for testing:

1. **GET** `/products`
   Fetch all products.

2. **POST** `/products/add`
   Add a new product.

3. **PATCH** `/products/{id}`
   Update an existing product.

4. **DELETE** `/products/{id}`
   Delete a product.

Base URL used:

https://dummyjson.com

---

# What Was Tested

The APIs were tested using **Postman** with different scenarios to validate how the API behaves under both valid and invalid conditions.

Testing included:

### 1. Functional Testing

- Fetching all products
- Creating a product
- Updating a product
- Deleting a product

### 2. Error Handling

- Invalid IDs
- Wrong HTTP methods
- Invalid data types
- Missing request body
- Missing fields

### 3. Edge Case Testing

- Negative values
- Very long strings
- Rating beyond valid range
- Empty request bodies

---

# Errors Observed and Findings

## 1. GET `/products`

### Invalid URL

Request:

```

GET /products/1653222222222

```

Response:

```

404 Not Found
Product with id '1653222222222' not found

```

### Wrong Method

Request:

```

POST /products

```

Response:

```

404 Not Found
Cannot POST /products

```

### Missing Protocol

Request:

```

dummyjson.com/products

```

Result:

```

200 OK

```

Observation:
The request still worked when the protocol was automatically assumed by the client.

---

# 2. POST `/products/add`

### Empty Body

Request:

```

{}

```

Response:

```

201 Created
{
"id":195
}

```

Observation:
The API **creates a product even without required fields**.

---

### Missing Required Field

Request:

```

{
"title": ""
}

```

Response:

```

201 Created
{
"id":195,
"title":""
}

```

Observation:
The API **does not validate empty fields**.

---

### Invalid Data Type

Request:

```

{
"price":"abc"
}

```

Response:

```

201 Created
{
"id":195,
"price":"abc"
}

```

Observation:
The API **does not validate numeric fields**.

---

### Very Long String

Request:

```

"title": "very long string..."

```

Response:

```

201 Created

```

Observation:
No length validation is applied.

---

# 3. PATCH `/products/{id}`

### Invalid Product ID

Request:

```

PATCH /products/999999

```

Response:

```

404 Not Found

```

---

### String Instead of Number

Request:

```

{
"price":"abc",
"rating":"4.5"
}

```

Response:

```

200 OK

```

Observation:
The API **accepts incorrect data types**.

---

### Negative Price

Request:

```

{
"price": -2000
}

```

Response:

```

200 OK

```

Observation:
Negative values are allowed without validation.

---

### Rating Greater Than 5

Request:

```

{
"rating": 10
}

```

Response:

```

200 OK

```

Observation:
The API **does not enforce rating limits**.

---

# 4. DELETE `/products/{id}`

### Invalid ID

Request:

```

DELETE /products/195

```

Response:

```

404 Not Found
Product with id '195' not found

```

---

### Already Deleted Product

Response:

```

isDeleted : true

```

Observation:
The API **marks the product as deleted instead of removing it permanently**.

---

### Wrong Method

Using GET instead of DELETE still returns the product.

Observation:
The API behaves like a normal fetch request when the wrong method is used.

---

# Key Learnings

1. Many APIs require **strong server-side validation**, but the DummyJSON API is designed mainly for testing and does not enforce strict validation.

2. Important validations that should exist in production APIs include:
   - Required field validation
   - Data type validation
   - Boundary validation (rating limits, price limits)
   - Proper HTTP method restrictions

3. Error handling is crucial for secure and reliable APIs.

4. Testing APIs should include:
   - Functional testing
   - Negative testing
   - Edge case testing
   - Security validation

---

# Conclusion

This exercise helped understand:

- How REST APIs behave
- How to test APIs using Postman
- Common API validation issues
- Importance of error handling in backend systems

The DummyJSON API works well for learning but lacks strict validation rules that would normally be present in production systems.

```

```
