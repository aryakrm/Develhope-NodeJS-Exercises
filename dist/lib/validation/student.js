"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.studentSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    age: typebox_1.Type.Integer(),
    score: typebox_1.Type.Integer(),
    isPassed: typebox_1.Type.Boolean(),
}, { additionalProperties: false });
//# sourceMappingURL=student.js.map