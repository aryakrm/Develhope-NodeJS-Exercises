"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const client_1 = __importDefault(require("./lib/prisma/client"));
const cors_1 = __importDefault(require("cors"));
const validation_1 = require("./lib/validation");
const multer_1 = require("./lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const corsOptions = {
    origin: "http://localhost:8080",
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.get("/students", async (request, response) => {
    const students = await client_1.default.student.findMany();
    response.json(students);
});
app.get("/students/:id(\\d+)", async (request, response, next) => {
    const studentId = Number(request.params.id);
    const student = await client_1.default.student.findUnique({
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
app.post("/students", (0, validation_1.validate)({ body: validation_1.studentSchema }), async (request, response) => {
    const studentData = request.body;
    const student = await client_1.default.student.create({
        data: studentData,
    });
    response.status(201).json(student);
});
app.put("/students/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.studentSchema }), async (request, response, next) => {
    const studentId = Number(request.params.id);
    const studentData = request.body;
    try {
        const student = await client_1.default.student.update({
            where: {
                id: studentId,
            },
            data: studentData,
        });
        response.status(200).json(student);
    }
    catch (error) {
        response.status(404);
        next(`Can not PUT /student/${studentId}`);
    }
});
app.delete("/students/:id(\\d+)", async (request, response, next) => {
    const studentId = Number(request.params.id);
    try {
        await client_1.default.student.delete({
            where: {
                id: studentId,
            },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`Can not PUT /student/${studentId}`);
    }
});
app.post("/students/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    console.log("request.file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No file Uploaded");
    }
    const photoFile = request.file.filename;
    response.status(201).json({ photoFile });
});
app.use(validation_1.ValidationErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map