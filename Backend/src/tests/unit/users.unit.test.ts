import { db } from "../../db";
import { user } from "../../db/schemas/user";
import { createUser, findUserByEmail } from "../../services/userService";

jest.setTimeout(30000);

describe("User Service", () => {
    const basicUser = {
        email: "real@example.com",
        fullName: "Real User",
        address: "123 Real Street",
        password: "password123",
    };

    it("should create a new user in the database", async () => {
        const createdUser = await createUser(basicUser);

        expect(createdUser).toMatchObject({
            id: expect.any(String),
            email: basicUser.email,
            fullName: basicUser.fullName,
            address: basicUser.address,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        const allUsers = await db.select().from(user);
        expect(allUsers.length).toBe(1);
    });

    it("should find a user by email", async () => {
        await createUser(basicUser);
        const foundUser = await findUserByEmail(basicUser.email);

        expect(foundUser).toMatchObject({
            id: expect.any(String),
            email: basicUser.email,
            fullName: basicUser.fullName,
            address: basicUser.address,
        });
    });

    it("should throw an error if user does not exist", async () => {
        await expect(findUserByEmail("notfound@example.com")).rejects.toThrow(
            "User not found"
        );
    });

    it("should throw an error if email already exists", async () => {
        await createUser(basicUser);
        await expect(createUser(basicUser)).rejects.toThrow("User already exists");
    });
});

afterEach(async () => {
    await db.delete(user).execute();
});
