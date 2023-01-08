import supertest from "supertest";
import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";
const request = supertest(app);
const run = () => {
  test("GET /students", async () => {
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
};

run();
