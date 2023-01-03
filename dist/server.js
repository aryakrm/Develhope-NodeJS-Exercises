"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const run = () => {
    const port = process.env.PORT;
    app_1.default.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
};
run();
//# sourceMappingURL=server.js.map