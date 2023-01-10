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
        .expect("Content-Type", /application\/json/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

      expect(response.body).toEqual(students);
    });
  });

  describe("GET /student/:id", () => {
    test("Valid request", async () => {
      const student = {
        id: 1,
        name: "Arya",
        age: 23,
        score: 82,
        isPassed: true,
      };

      // @ts-ignore
      prismaMock.student.findUnique.mockResolvedValue(student);

      const response = await request
        .get("/students/1")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toEqual(student);
    });

    test("Student does not exist", async () => {
      // @ts-ignore
      prismaMock.student.findUnique.mockResolvedValue(null);

      const response = await request
        .get("/students/23")
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not GET /students/23");
    });
    test("Invalid student ID", async () => {
      const response = await request
        .get("/students/asdf")
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not GET /students/asdf");
    });
  });

  describe("POST /students", () => {
    test("Valid request", async () => {
      const student = {
        id: 3,
        name: "Jack",
        age: 23,
        score: 82,
        isPassed: true,
      };

      // @ts-ignore
      prismaMock.student.create.mockResolvedValue(student);

      const response = await request
        .post("/students")
        .send({
          name: "Jack",
          age: 23,
          score: 82,
          isPassed: true,
        })
        .expect(201)
        .expect("Content-Type", /application\/json/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

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
  describe("PUT /students/:id", () => {
    test("Valid request", async () => {
      const student = {
        id: 3,
        name: "Jack",
        age: 33,
        score: 63,
        isPassed: false,
      };

      // @ts-ignore
      prismaMock.student.update.mockResolvedValue(student);

      const response = await request
        .put("/students/3")
        .send({
          name: "Jack",
          age: 33,
          score: 63,
          isPassed: false,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

      expect(response.body).toEqual(student);
    });

    test("Invalid request", async () => {
      const student = {
        age: 23,
        score: 82,
        isPassed: true,
      };

      const response = await request
        .put("/students/23")
        .send(student)
        .expect(422)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toEqual({
        errors: {
          body: expect.any(Array),
        },
      });
    });
    test("Student does not exist", async () => {
      // @ts-ignore
      prismaMock.student.update.mockRejectedValue(new Error("Error"));

      const response = await request
        .put("/students/23")
        .send({
          name: "Jack",
          age: 33,
          score: 63,
          isPassed: false,
        })
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not PUT /students/23");
    });
    test("Invalid student ID", async () => {
      const response = await request
        .put("/students/asdf")
        .send({
          name: "Jack",
          age: 33,
          score: 63,
          isPassed: false,
        })
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not PUT /students/asdf");
    });
  });
  describe("DELETE /student/:id", () => {
    test("Valid request", async () => {
      const response = await request
        .delete("/students/1")
        .expect(204)
        .expect("Access-Control-Allow-Origin", "http://localhost:8080");

      expect(response.text).toEqual("");
    });

    test("Student does not exist", async () => {
      // @ts-ignore
      prismaMock.student.delete.mockRejectedValue(new Error("Error"));

      const response = await request
        .get("/students/23")
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not DELETE /students/23");
    });
    test("Invalid student ID", async () => {
      const response = await request
        .delete("/students/asdf")
        .expect(404)
        .expect("Content-Type", /text\/html/);

      expect(response.text).toContain("Can not DELETE /students/asdf");
    });
  });
};

run();
