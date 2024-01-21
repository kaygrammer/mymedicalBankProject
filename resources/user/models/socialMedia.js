import mongoose from "mongoose";

const socialMediaSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
  },
  title: {
    type: String,
  },
  link: {
    type: String,
  },
});

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);

export default SocialMedia;