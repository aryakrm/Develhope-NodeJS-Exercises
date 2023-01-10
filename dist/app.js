"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./lib/validation");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/students", async (request, response) => {
    const students = await client_1.default.student.findMany();
    response.json(students);
});
app.post("/students", (0, validation_1.validate)({ body: validation_1.studentSchema }), async (request, response) => {
    const student = request.body;
    response.status(201).json(student);
});
app.use(validation_1.ValidationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map