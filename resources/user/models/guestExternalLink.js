import mongoose from "mongoose";

const guestExternalLinkSchema = new mongoose.Schema({
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

const guestExternalLink = mongoose.model("guestExternalLink", guestExternalLinkSchema);

export default guestExternalLink;