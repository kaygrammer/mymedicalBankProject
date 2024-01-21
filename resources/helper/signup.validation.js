import multer from 'multer'
import path from 'path'

const validate_signup = (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    gender,
    mobile_number,
    role,
    topic,
    work_sector,
    raised_capital,
    career_experience_url,
  } = req.body;

  switch (true) {
    case !email || !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !first_name:
      return res.status(400).json({ message: "First name is required" });
    case !last_name:
      return res.status(400).json({ message: "Last name is required" });
    case !gender:
      return res.status(400).json({ message: "Gender is required" });
    case !mobile_number:
      return res.status(400).json({ message: "Enter a valid phone number" });
    case !role:
      return res
        .status(400)
        .json({ message: "Enter a role you are signing up for" });
    case !topic:
      return res
        .status(400)
        .json({ message: "Enter the topic you want to speak on" });
    case !work_sector:
      return res
        .status(400)
        .json({ message: "Enter the sector you currently work in" });
    case !raised_capital:
      return res
        .status(400)
        .json({
          message: "Please indicate if you have at any point raised capital",
        });
    case !career_experience_url:
      return res
        .status(400)
        .json({
          message:
            "Please Upload a one-page summary (PDF only) of your career experience",
        });
    default:
      next();
  }
};

const validate_masterclass = (req, res, next) => {
  const {
    email,
    first_name,
    last_name,
    gender,
    mobile_number,
    role,
    linkedin,
    masterclass_topic,
    masterclass_topic_knowledge,
    masterclass_cv_url,
  } = req.body;
  switch (true) {
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !first_name:
      return res.status(400).json({ message: "First name is required" });
    case !last_name:
      return res.status(400).json({ message: "Last name is required" });
    case !gender:
      return res.status(400).json({ message: "Gender is required" });
    case !mobile_number:
      return res.status(400).json({ message: "Enter a valid phone number" });
    case !role:
      return res
        .status(400)
        .json({ message: "Enter a role you are signing up for" });
    case !linkedin:
      return res
        .status(400)
        .json({ message: "Enter a Valid linkedin Url" });
    case !masterclass_topic:
      return res
        .status(400)
        .json({ message: "Please select the topic you would like to talk about" });
    case !masterclass_topic_knowledge:
      return res
        .status(400)
        .json({
          message: "Describe in brief your knowledge about the topic you have selected",
        });
    case !masterclass_cv_url:
      return res
        .status(400)
        .json({
          message:
            "Please Upload your resume or CV",
        });
    default:
      next();
  }
};

const validate_exhibitors = (req, res, next) => {
  const {
    email,
    exhibitor_company_name,
    mobile_number,
    exhibition_size
  } = req.body;

  switch (true) {
    case !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email):
      return res.status(400).json({ message: "Enter a valid email address" });
    case !exhibitor_company_name:
      return res.status(400).json({ message: "Please Enter your company name" });
    case !mobile_number:
      return res.status(400).json({ message: "Please enter a valid phone number" });
    case !exhibition_size:
      return res.status(400).json({ message: "Please enter a valid exhibition size" });
    default:
      next();
  }
};


const uploadFile = (name) => {
  const upload = multer({
    dest: 'uploads/',
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
          // Uploads is the Upload_folder_name
          cb(null, "uploads/")
      },
      filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname + "-" + Date.now() + "." + path.extname(file.originalname))
      }
    }),
    limits: { fileSize: 5 * 1000 * 1000 },
    fileFilter: function (req, file, cb) {

      // Set the filetypes, it is optional
      var filetypes = /docx|doc|pdf/;
      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(path.extname(
        file.originalname).toLowerCase());

      if (mimetype && extname) {
        req.fileName = file.originalname
        return cb(null, true);
      }

      cb("Error: File upload only supports the "
        + "following filetypes - " + filetypes);
    }
  }).single(name)
  return upload
}

export { validate_signup, validate_masterclass, validate_exhibitors, uploadFile };
