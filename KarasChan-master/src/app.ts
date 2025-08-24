import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import productRoutes from "./routes/productRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import os from "os";

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

let requestCount = 0;

// Middleware to count requests
app.use((req, __, next) => {
  if (req.url.startsWith("/api")) {
    requestCount++;
  }
  next();
});

// Metrics endpoint
app.get("/metrics", (_req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuLoad = os.loadavg()[0]; // 1-min average
  const uptime = process.uptime();

  res.json({
    cpuLoad,
    memoryUsage: {
      rss: memoryUsage.rss,
      heapUsed: memoryUsage.heapUsed,
      heapTotal: memoryUsage.heapTotal
    },
    uptime,
    requestCount
  });
});


// API Routes+
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use(authMiddleware);
app.use("/api/carts", cartRoutes);

export { app };
