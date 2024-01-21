import mongoose from "mongoose";

const nicheSchema = new mongoose.Schema({
  niche: {
    type: String,
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
  },
});

const Niche = mongoose.model("Niche", nicheSchema);

export default Niche;