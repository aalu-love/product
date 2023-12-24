const request = require("supertest");
const app = require("../../index"); // Replace with the path to your Express app file

describe("Products API", () => {
  let productId;

  // Test case for GET /api/products
  it("should get all products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data).toBeInstanceOf(Array);
  });

  // Test case for GET /api/products/:id
  it("should get a product by id", async () => {
    const response = await request(app).get("/api/products/4");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  // Test case for POST /api/products
  it("should add a new product", async () => {
    const response = await request(app).post("/api/products").send({
      name: "new Product",
      price: 15022,
    });
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    productId = response.body.id; // Store the created product ID for future tests
  });

  // Test case for after POST /api/products/:id
  it("should have a product after add", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.id).toBe(productId);
  });

  // Test case for PUT /api/products/:id
  it("should update a product", async () => {
    const response = await request(app).put(`/api/products/${productId}`).send({
      name: "LUNA",
      price: 1000000,
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });

  // Test case for DELETE /api/products/:id
  it("should delete a product", async () => {
    const response = await request(app).delete(`/api/products/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Product deleted successfully");
  });
});
