import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import yaml from "yaml";
import { logger } from "./utils/logger";

import { rateLimiter } from "./middlewares/rateLimiter.middleware";
import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import projectRoutes from "./modules/projects/project.routes";

const app = express(); // ✅ CREATE APP FIRST

app.get("/", (_req, res) => {
  res.send("🚀 Backend is live!");
});

app.use((req, _res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
  });
  next();
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/v1/auth", rateLimiter); // ✅ NOW SAFE

// Swagger
const swaggerFile = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDoc = yaml.parse(swaggerFile);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);

// Global error handler
app.use(errorHandler);

export default app;
