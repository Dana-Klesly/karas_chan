import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import productRoutes from "./routes/productRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();

// Enable CORS for frontend access
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes+
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(authMiddleware);
app.use("/api/carts", cartRoutes);

export { app };
