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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const simple_git_1 = __importDefault(require("simple-git"));
const file_1 = require("./file");
const utils_1 = require("./utils");
const path = require("path");
// import path from "path";
const aws_1 = require("./aws");
//uploadFile("falguni/package.json","/Users/bhavi/Desktop/vercel/package.json");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
console.log(path.join(__dirname, `output\randomstring`));
//POSTMAN
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generate)(); //asd12
    yield (0, simple_git_1.default)().clone(repoUrl, path.join(__dirname, `output\${id}`));
    const files = (0, file_1.getAllFiles)(path.join(__dirname, `output\${id}`));
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        //from: //users/bhavi/vercel.....//output//13125512/app.js
        //extract : //output/13125512/app.js
        yield (0, aws_1.uploadFile)(file.slice(__dirname.length + 1), file); //users/bhavi/vercel...../output/.. (yeh reemove ho jayega )
    }));
    // console.log(files);
    // files.forEach(file=>{
    //     S3.upload
    // })
    //put this to s3
    res.json({
        id: id
    });
}));
//aws-sdk
//sdk.uploadDirToS3()=> no easy way to call this
//need to make an array
// iterate thru this array one by array
//[/falz/users/project/vercel/output/12345/app.tsx]
//then call sdk.uploadFile one by one cz there isnt an easy way to upload sdk.folder
app.listen(3000);
// function getAllFiles(arg0: any) {
//     throw new Error("Function not implemented.");
// }
