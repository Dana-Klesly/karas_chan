import { db } from "../../db";
import { cart, cartItem } from "../../db/schemas/cart";
import { product } from "../../db/schemas/product";
import { getProductByCartId, getProductById, getProducts, getTotalProductsCount } from "../../services/productService";

jest.setTimeout(30000);

describe("Product Service", () => {
    let createdProduct: any;
    let createdCart: any;

    beforeEach(async () => {
        const [insertedProduct] = await db
            .insert(product)
            .values({
                name: "Test Product",
                description: "This is a test product",
                image: "test.png",
                price: "99.99",
                quantity: 10,
            })
            .returning();

        createdProduct = insertedProduct;

        const [insertedCart] = await db
            .insert(cart)
            .values({
                status: "active",
            })
            .returning();

        createdCart = insertedCart;
    });

    afterEach(async () => {
        await db.delete(cartItem).execute();
        await db.delete(cart).execute();
        await db.delete(product).execute();
    });

    it("should fetch paginated products", async () => {
        const products = await getProducts({ limit: 5, offset: 0 });

        expect(Array.isArray(products)).toBe(true);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toMatchObject({
            id: expect.any(Number),
            name: "Test Product",
            description: "This is a test product",
            image: "test.png",
            price: "99.99",
            quantity: 10,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it("should return total products count", async () => {
        const total = await getTotalProductsCount();

        expect(total[0]).toMatchObject({
            count: expect.any(Number),
        });
        expect(total[0].count).toBeGreaterThan(0);
    });

    it("should get a product by ID", async () => {
        const productById = await getProductById(createdProduct.id);

        expect(productById).toMatchObject({
            id: createdProduct.id,
            name: "Test Product",
            description: "This is a test product",
            image: "test.png",
            price: "99.99",
            quantity: 10,
        });
    });

    it("should get a product by cart ID and item ID", async () => {
        const [insertedCartItem] = await db
            .insert(cartItem)
            .values({
                productId: createdProduct.id,
                cartId: createdCart.id,
                quantity: 1,
            })
            .returning();

        if (!insertedCartItem) throw new Error("Cart item not created");

        const fetchedProduct = await getProductByCartId({
            cartId: insertedCartItem.cartId!,
            itemId: insertedCartItem.id,
        });

        expect(fetchedProduct).toMatchObject({
            id: createdProduct.id,
            name: "Test Product",
            description: "This is a test product",
            image: "test.png",
            price: "99.99",
            quantity: 10,
        });
    });
});

afterAll(async () => {
    await db.delete(cartItem).execute();
    await db.delete(cart).execute();
    await db.delete(product).execute();
});