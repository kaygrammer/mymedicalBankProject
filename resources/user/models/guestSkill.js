import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guest",
    required: true,
  },
  skill: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;