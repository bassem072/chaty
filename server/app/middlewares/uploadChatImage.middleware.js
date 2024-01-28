import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { ApiError } from "../utils/apiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/uploads/chatImages/");
  },
  filename: (req, file, cb) => {
    //console.log(req.chat);
    if (req.chat.chatImage !== "default") {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const filePath = path.join(
        __dirname,
        "..",
        "uploads",
        "chatImages",
        req.chat.chatImage
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);

    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError("Only jpg, jpeg, png files are allowed", 400), false);
  }
};

export const upload = multer({ storage, fileFilter });
