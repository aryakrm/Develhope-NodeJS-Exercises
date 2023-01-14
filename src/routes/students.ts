import prisma from "../lib/prisma/client";

import {
  validate,
  studentSchema,
  StudentData,
} from "../lib/middleware/validation";

import { initMulterMiddleware } from "../lib/middleware/multer";
import express, { Router } from "express";
const upload = initMulterMiddleware();

const router = Router();

router.get("/", async (request, response) => {
  const students = await prisma.student.findMany();
  response.json(students);
});
router.get("/:id(\\d+)", async (request, response, next) => {
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
router.post(
  "/",
  validate({ body: studentSchema }),
  async (request, response) => {
    const studentData: StudentData = request.body;
    const student = await prisma.student.create({
      data: studentData,
    });
    response.status(201).json(student);
  }
);
router.put(
  "/:id(\\d+)",
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
router.delete("/:id(\\d+)", async (request, response, next) => {
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

router.post(
  "/:id(\\d+)/photo",
  upload.single("photo"),
  async (request, response, next) => {
    console.log("request.file", request.file);

    if (!request.file) {
      response.status(400);
      return next("No file Uploaded");
    }
    const photoFile = request.file.filename;
    response.status(201).json({ photoFile });
  }
);

export default router;
