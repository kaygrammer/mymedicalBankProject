import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  emailOtp: {
    type: String,
  },
  password: {
    type: String,
  },
  attendanceMode: {
    type: String,
    enum: ["In-Person", "Virtual"],
  },
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
    },
  ],
  niches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Niche",
    },
  ],
  fullName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  placeOfWork: {
    type: String,
  },
  aboutMe: {
    type: String,
  },
  socialMedia: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SocialMedia",
    },
  ],
  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  externalLinks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guestExternalLink",
    },
  ],
});

const Guest = mongoose.model("Guest", guestSchema);

export default Guest;