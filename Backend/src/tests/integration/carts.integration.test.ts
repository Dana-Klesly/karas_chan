import request from "supertest";
import { app } from "../../app";
import { basicUser, createUser } from "../lib";
import { db } from "../../db";
import { user } from "../../db/schemas/user";
import { product } from "../../db/schemas/product";

describe("Check for carts endpoints existence", () => {

  it("should create a new cart for the current user and return 201 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    const createCartResponse = await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    expect(createCartResponse.body).toMatchObject({
      status: "success",
      statusCode: 201,
      message: "Cart created successfully",
      data: {
        id: expect.any(Number),
        status: "active",
        checkedOutAt: null,
        archivedAt: null,
        userId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("should retrieve the current user's cart and return 200 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    const createCartResponse = await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    const getCartResponse = await request(app)
      .get("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(200);

    expect(getCartResponse.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Cart retrieved successfully",
      data: {
        id: createCartResponse.body.data.id,
        status: "active",
        checkedOutAt: null,
        archivedAt: null,
        userId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("should add an item to the cart and return 201 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    const createCartResponse = await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    // Insert product directly into database
    const [productRecord] = await db.insert(product).values({
      name: "Test Product",
      description: "A test product",
      price: "55.99",
      quantity: 5,
    }).returning();

    const addItemResponse = await request(app)
      .post("/api/carts/items")
      .send({ productId: productRecord.id, quantity: 2 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    expect(addItemResponse.body).toMatchObject({
      status: "success",
      statusCode: 201,
      message: "Cart item added successfully",
      data: {
        id: expect.any(Number),
        cartId: createCartResponse.body.data.id,
        productId: productRecord.id,
        quantity: 2,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("should update a cart item's quantity and return 200 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    // Create a new cart
    await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    const [productRecord] = await db.insert(product).values({
      name: "Test Product",
      description: "A test product",
      price: "66.99",
      quantity: 10,
    }).returning();

    const addItemResponse = await request(app)
      .post("/api/carts/items")
      .send({ productId: productRecord.id, quantity: 1 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    const updateItemResponse = await request(app)
      .patch(`/api/carts/items/${addItemResponse.body.data.id}`)
      .send({ quantity: 3 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(200);

    expect(updateItemResponse.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Cart item updated successfully",
      data: {
        id: addItemResponse.body.data.id,
        quantity: 3,
      },
    });
  });

  it("should delete a cart item and return 200 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    // Create a new cart
    await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    const [productRecord] = await db.insert(product).values({
      name: "Test Product",
      description: "A test product",
      price: "77.99",
      quantity: 3,
    }).returning();

    const addItemResponse = await request(app)
      .post("/api/carts/items")
      .send({ productId: productRecord.id, quantity: 1 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    const deleteItemResponse = await request(app)
      .delete(`/api/carts/items/${addItemResponse.body.data.id}`)
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(200);

    expect(deleteItemResponse.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Cart item deleted successfully",
      data: {
        id: addItemResponse.body.data.id,
      },
    });
  });

  it("should retrieve all items in the current user's cart and return 200 success", async () => {
    await createUser(basicUser);

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send({ email: basicUser.email, password: basicUser.password })
      .expect(200);

    // Create a new cart
    await request(app)
      .post("/api/carts")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    // Insert products directly into database
    const [product1] = await db.insert(product).values({
      name: "Product 1",
      description: "First product",
      price: "20.00",
      quantity: 10,
    }).returning();

    const [product2] = await db.insert(product).values({
      name: "Product 2",
      description: "Second product",
      price: "30.00",
      quantity: 5,
    }).returning();

    // Add items to cart
    await request(app)
      .post("/api/carts/items")
      .send({ productId: product1.id, quantity: 2 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    await request(app)
      .post("/api/carts/items")
      .send({ productId: product2.id, quantity: 1 })
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(201);

    // Retrieve cart items
    const getItemsResponse = await request(app)
      .get("/api/carts/items")
      .set("Authorization", `Bearer ${userLoginResponse.body.data.accessToken}`)
      .expect(200);

    expect(getItemsResponse.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Cart items retrieved successfully",
      data: expect.arrayContaining([
        expect.objectContaining({ productId: product1.id, quantity: 2 }),
        expect.objectContaining({ productId: product2.id, quantity: 1 }),
      ]),
      meta: {
        current_page: 1,
        per_page: 10,
        total: 2,
        count: 2,
        has_next_page: false,
        has_previous_page: false,
        last_page: expect.any(Number),
      },
    });
  });

});


afterEach(async () => {
  await db.delete(user).execute();
  await db.delete(product).execute();
});
