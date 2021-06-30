import multer from "multer";
import path from "path";
import config from "../config";
export const storage = multer.diskStorage({
  destination: config.folders.profilePicturesFolder,
  filename: (req, file, cb) => {
    if (!req.user) {
      return cb(
        { message: "You are not authenticated", name: "Authentication error" },
        ""
      );
    }
    cb(
      null,
      `id=${(req.user as any).id}` +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (_req, file, cb) => {
    checkFileType(file, cb);
  },
}).single("image");

const checkFileType = (
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ message: "Only images allowed", name: "Invalid extension" });
  }
};
