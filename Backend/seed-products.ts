import productsData from "./products.json";
import { db } from "./src/db";
import { product } from "./src/db/schemas/product";

async function seedProducts() {
  console.log("Seeding products...");

  for (const p of productsData) {
    await db.insert(product).values({
      name: p.name,
      image: p.image ?? null,
      description: p.description,
      price: p.price.toString(),
      quantity: p.quantity,
      createdAt: p.created_at ? new Date(p.created_at) : new Date(),
      updatedAt: p.updated_at ? new Date(p.updated_at) : new Date(),
    }).onConflictDoNothing();
  }

  console.log("Products seeded successfully!");
  process.exit(0);
}

seedProducts().catch((err) => {
  console.error(err);
  process.exit(1);
});

