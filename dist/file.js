"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFiles = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllFiles = (folderPath) => {
    let response = [];
    console.log("Entering folder:", folderPath);
    const allFilesAndFolders = fs_1.default.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path_1.default.join(folderPath, file);
        console.log("Processing file/folder:", fullFilePath);
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
            console.log("It's a directory. Recursing into:", fullFilePath);
            response = response.concat((0, exports.getAllFiles)(fullFilePath));
        }
        else {
            console.log("It's a file. Adding to response:", fullFilePath);
            response.push(fullFilePath);
        }
    });
    return response;
};
exports.getAllFiles = getAllFiles;
