import request from "supertest";
import { app } from "../app";

export const basicUser = {
  email: "johndoe@example.com",
  password: "password",
  confirmPassword: "password",
  fullName: "John Doe",
  address: "123 Main St",
};

export const createUser = async (input: typeof basicUser) =>
  request(app)
    .post("/api/auth/signup")
    .send(input)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(201);
