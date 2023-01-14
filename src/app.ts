import express from "express";
import "express-async-errors";
import { initCorsMiddleware } from "./lib/middleware/cors";

import { ValidationErrorMiddleware } from "./lib/middleware/validation";
import studentsRoutes from "./routes/students";

const app = express();

app.use(express.json());

app.use(initCorsMiddleware);

app.use("/students", studentsRoutes);

app.use(ValidationErrorMiddleware);

export default app;
