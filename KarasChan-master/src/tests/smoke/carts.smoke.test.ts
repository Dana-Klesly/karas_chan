import request from "supertest";
import { app } from "../../app";

describe("Carts Endpoints Smoke Tests (Unauthorized Access)", () => {

  it("should return 401 and an error message when fetching carts without authentication", async () => {
    const response = await request(app)
      .get("/api/carts")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

  it("should return 401 and an error message when creating a cart without authentication", async () => {
    const response = await request(app)
      .post("/api/carts")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

  it("should return 401 and an error message when adding an item to the cart without authentication", async () => {
    const response = await request(app)
      .post("/api/carts/items")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

  it("should return 401 and an error message when fetching cart items without authentication", async () => {
    const response = await request(app)
      .get("/api/carts/items")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

  it("should return 401 and an error message when deleting a cart item without authentication", async () => {
    const response = await request(app)
      .delete("/api/carts/items/1")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

  it("should return 401 and an error message when updating a cart item without authentication", async () => {
    const response = await request(app)
      .patch("/api/carts/items/1")
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body).toMatchObject({
      status: "error",
      statusCode: 401,
      message: "Access Denied",
      details: "Missing authorization token",
    });
  });

});

