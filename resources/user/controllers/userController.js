import UserServices from "../../helper/user.services.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import User from "../models/user.js";
import EmailService from "../../../utils/email/email-sender.js";
import cloudinary from "../../../utils/Pic/cloudinary.js";
import { userSchema } from "../../../utils/validation/validation.js";
    
import multer from "multer";
import { log } from "console";

const emailService = new EmailService();

const signUp = async (req, res) => {
  try {
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

    // const { error } = userSchema.validate(req.body);
    // if (error) {
    //   console.log(error.message);
    //   return errorResMsg(res, 404, error.message);
    // }
  
    const existingUser = await UserServices.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.create({
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
    });
    emailService.sendSpeakerEmail(first_name, email)
    return res.status(201).json({
      message: "Registration completed",
      Name: `${user.first_name} ${user.last_name}`,
      id: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const masterclass_signup = async (req, res) => {
  try {
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

    const existingUser = await UserServices.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.create({
      email,
      first_name,
      last_name,
      mobile_number,
      gender,
      role,
      personal_web_url,
      linkedin,
      masterclass_topic,
      masterclass_topic_knowledge,
      masterclass_cv_url,
    });

    return res.status(201).json({
      message: "Registration completed",
      Name: `${user.first_name} ${user.last_name}`,
      id: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error("Error during masterclass signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const exhibitor_signup = async (req, res) => {
  try {
    const { email, exhibitor_company_name, mobile_number, exhibition_size } =
      req.body;

    const existingUser = await UserServices.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const user = await User.create({
      email,
      exhibitor_company_name,
      mobile_number,
      exhibition_size,
    });

    return res.status(201).json({ message: "Registration completed" });
  } catch (error) {
    console.error("Error during exhibitor signup:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const uploadFile = async (req, res) => {
  try {
    //const { isFileUploaded, fileName } = req;
    const result = await cloudinary.uploader.upload(req.file.path);

    return res.status(200).json({ message: "done", link: result.url });
  } catch (error) {
    console.error("Error during exhibitor signup:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export { signUp, masterclass_signup, exhibitor_signup, uploadFile };
