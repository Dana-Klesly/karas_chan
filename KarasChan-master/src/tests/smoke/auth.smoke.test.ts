import request from "supertest";
import { app } from "../../app";

describe("Authentication Endpoints Smoke Tests", () => {

  it("should return 400 and a validation error when attempting to register with invalid or missing data", async () => {
    const response = await request(app)
      .post("/api/auth/signup")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: "Validation failed",
      status: "error",
      statusCode: 400,
    });
  });

  it("should return 400 and a validation error when attempting to sign in with invalid or missing credentials", async () => {
    const response = await request(app)
      .post("/api/auth/signin")
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toMatchObject({
      message: "Validation failed",
      status: "error",
      statusCode: 400,
    });
  });

});
