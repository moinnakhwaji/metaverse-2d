"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./src/routes/v1/index");
// import { router } from "."
const app = (0, express_1.default)();
app.use("/api/v1", index_1.router);
app.listen(process.env.PORT || 3000, () => {
    console.log("moin code is running");
});
