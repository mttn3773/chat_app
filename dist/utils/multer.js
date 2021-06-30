"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
exports.storage = multer_1.default.diskStorage({
    destination: config_1.default.folders.profilePicturesFolder,
    filename: (req, file, cb) => {
        if (!req.user) {
            return cb({ message: "You are not authenticated", name: "Authentication error" }, "");
        }
        cb(null, `id=${req.user.id}` +
            "-" +
            Date.now() +
            path_1.default.extname(file.originalname));
    },
});
exports.upload = multer_1.default({
    storage: exports.storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter: (_req, file, cb) => {
        checkFileType(file, cb);
    },
}).single("image");
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb({ message: "Only images allowed", name: "Invalid extension" });
    }
};
//# sourceMappingURL=multer.js.map