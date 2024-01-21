import multer from "multer";
import path from "path";

//multer config

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext != ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
  // destination: function (req, file, cb) {
  //   cb(null, 'uploads/'); // Set the destination folder for uploaded files
  // },
  // filename: function (req, file, cb) {
  //   cb(null, file.originalname); // Set the filename for uploaded files
  // }
});

// Configuration for files
const fileStorage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "uploads/files/"); // Set the destination folder for uploaded files
  // },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
      cb(new Error("Only PDF, Word, and related files are allowed"), false);
      return;
    }
    cb(null, true);
  },
});
const upload = multer({ storage:storage });
const fileupload = multer({ storage:fileStorage });

export {upload, fileupload};
