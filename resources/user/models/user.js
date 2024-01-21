import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  gender: {
    type: String,
  },
  mobile_number: {
    type: Number,
  },
  gender: {
    type: String,
  },
  personal_web_url: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  role: {
    type: String,
  },
  topic: {
    type: String,
  },
  work_sector: {
    type: String,
  },
  other_work_sector: {
    type: String,
  },
  comm_skills: {
    type: String,
  },
  years_of_exp: {
    type: String,
  },
  current_role: {
    type: String,
  },

  raised_capital: {
    type: String,
  },
  career_experience_url: {
    type: String,
  },

  speaker_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  masterclass_topic: {
    type: String,
  },
  masterclass_topic_knowledge: {
    type: String,
  },
  masterclass_cv_url: {
    type: String,
  },
  exhibitor_company_name: {
    type: String,
  },
  exhibitor_mobile_number: {
    type: String,
  },
  exhibition_size: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);

export default User;
