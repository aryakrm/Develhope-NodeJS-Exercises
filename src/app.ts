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
app.get("/students/:id(\\d+)", async (request, response, next) => {
  const studentId = Number(request.params.id);
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });
  if (!student) {
    response.status(404);
    return next(`Can not GET /students/${studentId}`);
  }
  response.json(student);
});
app.post(
  "/students",
  validate({ body: studentSchema }),
  async (request, response) => {
    const studentData: StudentData = request.body;
    const student = await prisma.student.create({
      data: studentData,
    });
    response.status(201).json(student);
  }
);
app.put(
  "/students/:id(\\d+)",
  validate({ body: studentSchema }),
  async (request, response, next) => {
    const studentId = Number(request.params.id);
    const studentData: StudentData = request.body;
    try {
      const student = await prisma.student.update({
        where: {
          id: studentId,
        },
        data: studentData,
      });
      response.status(200).json(student);
    } catch (error) {
      response.status(404);
      next(`Can not PUT /student/${studentId}`);
    }
  }
);
app.delete("/students/:id(\\d+)", async (request, response, next) => {
  const studentId = Number(request.params.id);
  try {
    await prisma.student.delete({
      where: {
        id: studentId,
      },
    });
    response.status(204).end();
  } catch (error) {
    response.status(404);
    next(`Can not PUT /student/${studentId}`);
  }
});

app.use(ValidationErrorMiddleware);

export default app;
