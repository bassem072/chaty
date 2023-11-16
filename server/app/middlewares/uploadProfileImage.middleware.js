import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path";
import fs from "fs";
import { ApiError } from "../utils/apiError.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profileImages/");
  },
  filename: (req, file, cb) => {
    if (req.user.profileImage != "user.png") {
      const filePath = path.join("uploads/profileImages/", req.user.profileImage);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];

    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ApiError("Only jpg, jpeg, png files are allowed", 400), false);
    }
};

export const upload = multer({ storage, fileFilter }).single("profileImage");