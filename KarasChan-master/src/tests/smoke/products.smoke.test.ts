import request from "supertest";
import { app } from "../../app";

describe("Products Endpoints Smoke Tests", () => {

  it("should return 200 and a success message when fetching the list of products", async () => {
    const response = await request(app)
      .get("/api/products")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toMatchObject({
      status: "success",
      statusCode: 200,
      message: "Products retrieved successfully",
      meta: expect.anything(),
    });
  });

});
