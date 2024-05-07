"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "",
    secretAccessKey: ""
});
//filename => output/12345/src/App.jsx      // s3 ka file structure hai
//localfilePath => /users//vercel/dist/output/1322516/src/App.jsx    // whrerw can i find this file locally ka path hai 
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    // Print a message to indicate that the function is called
    console.log("called");
    // Read the content of the file from the local file system
    const fileContent = fs_1.default.readFileSync(localFilePath);
    // Upload the file content to an AWS S3 bucket
    const response = yield s3.upload({
        Body: fileContent, // The content of the file
        Bucket: "myvercell", // The name of the S3 bucket where the file will be uploaded
        Key: fileName, // The name/key of the file in the S3 bucket
    }).promise();
    // Print the response from the S3 upload operation
    console.log(response);
});
exports.uploadFile = uploadFile;
