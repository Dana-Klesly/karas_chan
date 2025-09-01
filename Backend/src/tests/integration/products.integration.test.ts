import request from "supertest";
import { app } from "../../app";

describe("Products Endpoints Integration Tests", () => {

  it("should fetch all products and return a 200 success response with product data and metadata", async () => {
    const response = await request(app)
      .get("/api/products")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Products retrieved successfully",
      data: expect.arrayContaining([]),
      meta: expect.anything(),
    });
  });

});
