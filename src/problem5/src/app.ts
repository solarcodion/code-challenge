import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import resourceRoutes from "./routes/resourceRoutes";

// Load environment variables
dotenv.config();

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/resources", resourceRoutes);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Resource API",
    endpoints: {
      resources: "/api/resources",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

export default app;
