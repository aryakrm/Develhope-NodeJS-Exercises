"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../lib/prisma/client"));
const validation_1 = require("../lib/middleware/validation");
const multer_1 = require("../lib/middleware/multer");
const express_1 = require("express");
const passport_1 = require("../lib/middleware/passport");
const upload = (0, multer_1.initMulterMiddleware)();
const router = (0, express_1.Router)();
router.get("/", async (request, response) => {
    const students = await client_1.default.student.findMany();
    response.json(students);
});
router.get("/:id(\\d+)", async (request, response, next) => {
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
router.post("/", passport_1.checkAuthorization, (0, validation_1.validate)({ body: validation_1.studentSchema }), async (request, response) => {
    const studentData = request.body;
    const student = await client_1.default.student.create({
        data: studentData,
    });
    response.status(201).json(student);
});
router.put("/:id(\\d+)", passport_1.checkAuthorization, (0, validation_1.validate)({ body: validation_1.studentSchema }), async (request, response, next) => {
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
router.delete("/:id(\\d+)", passport_1.checkAuthorization, async (request, response, next) => {
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
router.post("/:id(\\d+)/photo", passport_1.checkAuthorization, upload.single("photo"), async (request, response, next) => {
    console.log("request.file", request.file);
    if (!request.file) {
        response.status(400);
        return next("No file Uploaded");
    }
    const photoFile = request.file.filename;
    response.status(201).json({ photoFile });
});
exports.default = router;
//# sourceMappingURL=students.js.map