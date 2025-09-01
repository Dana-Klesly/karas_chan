import request from "supertest";
import { app } from "../../app";
import { basicUser, createUser } from "../lib";
import { db } from "../../db";
import { user } from "../../db/schemas/user";

describe("Authentication Endpoints Integration Tests", () => {

  it("should create a new user and return a 200 success response when signing up", async () => {
    const createUserResponse = await createUser(basicUser);

    expect(createUserResponse.body).toMatchObject({
      message: "User signed up successfully",
      data: {
        id: expect.any(String),
        email: basicUser.email,
        fullName: basicUser.fullName,
        address: basicUser.address,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it("should sign in an existing user and return a 201 success response with access token", async () => {
    await createUser(basicUser);

    const userLoginInput = {
      email: basicUser.email,
      password: basicUser.password,
    };

    const userLoginResponse = await request(app)
      .post("/api/auth/signin")
      .send(userLoginInput)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(userLoginResponse.body).toMatchObject({
      message: "Signed in successfully",
      data: {
        accessToken: expect.any(String),
        expiresAt: expect.any(String),
      },
    });
  });

});


afterEach(async () => {
  await db.delete(user).execute();
});
