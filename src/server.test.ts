import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";
const request = supertest(app);
const run = () => {
  describe("GET /students", () => {
    test("Valid request", async () => {
      const students = [
        {
          id: 1,
          name: "Arya",
          age: 23,
          score: 82,
          isPassed: true,
        },
      ];

      // @ts-ignore
      prismaMock.student.findMany.mockResolvedValue(students);

      const response = await request
        .get("/students")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toEqual(students);
    });
  });

  describe("POST /students", () => {
    test("Valid request", async () => {
      const student = {
        name: "Arya",
        age: 23,
        score: 82,
        isPassed: true,
      };

      const response = await request
        .post("/students")
        .send(student)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toEqual(student);
    });

    test("Invalid request", async () => {
      const student = {
        age: 23,
        score: 82,
        isPassed: true,
      };

      const response = await request
        .post("/students")
        .send(student)
        .expect(422)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toEqual({
        errors: {
          body: expect.any(Array),
        },
      });
    });
  });
};

run();
