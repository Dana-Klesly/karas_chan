import { db } from "../db";
import { cart, cartItem } from "../db/schemas/cart";
import { eq, and, count, asc } from "drizzle-orm";
import { PaginationInputSchema } from "../types/inputSchemas";
import { product } from "../db/schemas/product";

export async function getCartByUserId(userId: string) {
  let queriedCart = undefined;
  try {
    queriedCart = await db
      .select()
      .from(cart)
      .where(and(eq(cart.userId, userId), eq(cart.status, "active")));
  } catch (error) {
    throw new Error("Database error");
  }
  return queriedCart[0];
}

export async function createCart(userId: string) {
  let createdCart = undefined;
  try {
    createdCart = await db.insert(cart).values({ userId }).returning();
  } catch (error) {
    throw new Error("Database error");
  }
  if (!createdCart.length) throw new Error("Cart not created");
  return createdCart[0];
}

export async function getCartItems(
  input: { cartId: number } & Required<PaginationInputSchema>,
) {
  let cartItems = undefined;
  try {
    cartItems = await db
      .select({
        id: cartItem.id,
        cartId: cartItem.cartId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        createdAt: cartItem.createdAt,
      })
      .from(cart)
      .innerJoin(cartItem, eq(cartItem.cartId, cart.id))
      .where(eq(cart.id, input.cartId))
      .orderBy(asc(cartItem.createdAt))
      .limit(input.limit + 1)
      .offset(input.offset);
  } catch (error) {
    throw new Error("Database error");
  }
  return cartItems;
}

export async function getTotalCartItemsCount(cartId: number) {
  let totalCartItems = undefined;
  try {
    totalCartItems = await db
      .select({ count: count() })
      .from(cart)
      .where(eq(cart.id, cartId))
      .innerJoin(cartItem, eq(cartItem.cartId, cartItem.id));
  } catch (error) {
    throw new Error("Database error");
  }
  return totalCartItems;
}

export async function addItemToCart(input: {
  cartId: number;
  productId: number;
  quantity: number;
}) {
  let createdCartItem = undefined;
  try {
    createdCartItem = await db.insert(cartItem).values(input).returning();
  } catch (error) {
    throw new Error("Database error");
  }
  if (!createdCartItem.length) throw new Error("Cart item not created");
  return createdCartItem[0];
}

export async function deleteCartItem({
  cartId,
  itemId,
}: {
  cartId: number;
  itemId: number;
}) {
  let deletedCartItem = undefined;
  try {
    deletedCartItem = await db
      .delete(cartItem)
      .where(and(eq(cartItem.id, itemId), eq(cartItem.cartId, cartId)))
      .returning();
  } catch (error) {
    throw new Error("Database error");
  }
  return deletedCartItem[0];
}

export async function updateCartItemQuantity({
  cartId,
  itemId,
  quantity,
}: {
  cartId: number;
  itemId: number;
  quantity: number;
}) {
  let updatedCartItem = undefined;
  try {
    updatedCartItem = await db
      .update(cartItem)
      .set({ quantity })
      .where(and(eq(cartItem.id, itemId), eq(cartItem.cartId, cartId)))
      .returning();
  } catch (error) {
    throw new Error("Database error");
  }
  return updatedCartItem[0];
}

export async function getCartItemsByUserId(userId: string) {
  let cartItems = undefined;
  try {
    cartItems = await db
      .select({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        cartId: cartItem.cartId,
      })
      .from(cart)
      .innerJoin(cartItem, eq(cartItem.cartId, cart.id))
      .innerJoin(product, eq(product.id, cartItem.productId))
      .where(and(eq(cart.userId, userId), eq(cart.status, "active")));
  } catch (error) {
    throw new Error("Database error");
  }
  return cartItems;
}










