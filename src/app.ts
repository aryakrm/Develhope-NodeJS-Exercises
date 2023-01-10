import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
import {
  validate,
  ValidationErrorMiddleware,
  studentSchema,
  StudentData,
} from "./lib/validation";
const app = express();

app.use(express.json());

app.get("/students", async (request, response) => {
  const students = await prisma.student.findMany();
  response.json(students);
});
app.post(
  "/students",
  validate({ body: studentSchema }),
  async (request, response) => {
    const student: StudentData = request.body;
    response.status(201).json(student);
  }
);

app.use(ValidationErrorMiddleware);

export default app;
