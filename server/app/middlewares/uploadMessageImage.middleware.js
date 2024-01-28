import multer from "multer";
import path from "path";
import { ApiError } from "../utils/apiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./app/uploads/messageImages/" + req.params.chatId);
  },
  filename: (req, file, cb) => {
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
