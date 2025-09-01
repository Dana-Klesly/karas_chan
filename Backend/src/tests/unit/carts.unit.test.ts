import {
    getCartByUserId,
    createCart,
    getCartItems,
    getTotalCartItemsCount,
    addItemToCart,
    deleteCartItem,
    updateCartItemQuantity,
    getCartItemsByUserId,
} from "../../services/cartService";
import { db } from "../../db";
import { cart, cartItem } from "../../db/schemas/cart";
import { product } from "../../db/schemas/product";
import type { InferSelectModel } from "drizzle-orm";
import { user } from "../../db/schemas/user";
import bcrypt from "bcrypt";

let createdUser: InferSelectModel<typeof user>;
let createdCart: InferSelectModel<typeof cart>;
let createdProduct: InferSelectModel<typeof product>;
let createdCartItem: InferSelectModel<typeof cartItem>;

beforeAll(async () => {
    await db.delete(cartItem);
    await db.delete(cart);
    await db.delete(product);
    await db.delete(user);
    const hashedPassword = await bcrypt.hash("password", 10);
    createdUser = (
        await db
            .insert(user)
            .values({
                email: "test@example.com",
                password: hashedPassword,
                fullName: "Test User",
                address: "Test Address",
            })
            .returning()
    )[0];

    createdCart = (
        await db.insert(cart).values({ userId: createdUser.id }).returning()
    )[0];

    createdProduct = (
        await db
            .insert(product)
            .values({
                name: "Test Product",
                description: "Test Description",
                price: "10.00",
                quantity: 5,
            })
            .returning()
    )[0];

    createdCartItem = (
        await db
            .insert(cartItem)
            .values({
                cartId: createdCart.id,
                productId: createdProduct.id,
                quantity: 2,
            })
            .returning()
    )[0];
});

describe("Cart Service", () => {
    it("should get a cart by user id", async () => {
        const cartResult = await getCartByUserId(createdUser.id);
        expect(cartResult).toMatchObject({
            id: createdCart.id,
            userId: createdUser.id,
            status: "active",
        });
    });

    it("should create a cart", async () => {
        const newCart = await createCart(createdUser.id);
        expect(newCart).toMatchObject({
            userId: createdUser.id,
            status: "active",
        });
    });

    it("should get cart items", async () => {
        const cartItems = await getCartItems({
            cartId: createdCart.id,
            limit: 10,
            offset: 0,
        });
        expect(cartItems.length).toBeGreaterThan(0);
        expect(cartItems[0]).toMatchObject({
            id: createdCartItem.id,
            cartId: createdCart.id,
            productId: createdProduct.id,
            quantity: createdCartItem.quantity,
        });
    });

    it("should get total cart items count", async () => {
        const countResult = await getTotalCartItemsCount(createdCart.id);
        expect(countResult[0].count).toBeDefined();
    });

    it("should add an item to cart", async () => {
        const newCartItem = await addItemToCart({
            cartId: createdCart.id,
            productId: createdProduct.id,
            quantity: 3,
        });
        expect(newCartItem).toMatchObject({
            cartId: createdCart.id,
            productId: createdProduct.id,
            quantity: 3,
        });
    });

    it("should update cart item quantity", async () => {
        const updated = await updateCartItemQuantity({
            cartId: createdCart.id,
            itemId: createdCartItem.id,
            quantity: 5,
        });
        expect(updated).toMatchObject({
            id: createdCartItem.id,
            quantity: 5,
        });
    });

    it("should delete a cart item", async () => {
        const deleted = await deleteCartItem({
            cartId: createdCart.id,
            itemId: createdCartItem.id,
        });
        expect(deleted).toMatchObject({
            id: createdCartItem.id,
        });
    });

    it("should get cart items by user id", async () => {
        const cartItems = await getCartItemsByUserId(createdUser.id);
        expect(cartItems.length).toBeGreaterThanOrEqual(0);
    });
});

afterAll(async () => {
    await db.delete(cartItem);
    await db.delete(cart);
    await db.delete(product);
    await db.delete(user);
});
