import express from "express";
import "express-async-errors";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { passport } from "./lib/middleware/passport";
import { initSessionMiddleware } from "./lib/middleware/session";

import { ValidationErrorMiddleware } from "./lib/middleware/validation";
import studentsRoutes from "./routes/students";
import authRoutes from "./routes/auth";

const app = express();

app.use(initSessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(initCorsMiddleware);

app.use("/students", studentsRoutes);
app.use("/auth", authRoutes);

app.use(ValidationErrorMiddleware);

export default app;
