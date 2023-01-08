import express from "express";
import "express-async-errors";
import prisma from "./lib/prisma/client";
const app = express();

app.get("/students", async (request, response) => {
  const students = await prisma.student.findMany();
  response.json(students);
});

export default app;
