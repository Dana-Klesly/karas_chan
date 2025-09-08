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
    origin: "https://api-service-477873493019.europe-west10.run.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let requestCount = 0;

// Middleware to count requests
app.use((req, __, next) => {
  if (req.url.startsWith("/api")) {
    requestCount++;
  }
  next();
});

// API Routes+
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(authMiddleware);
app.use("/api/carts", cartRoutes);

export { app };
