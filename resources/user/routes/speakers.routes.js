import express from "express";
import {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeakerById,
  deleteSpeakerById,
} from "../controllers/speakers.js";
import {upload} from "../../../utils/Pic/multer.js"; 

const router = express.Router();

router.post("/", upload.single("images"), createSpeaker);

router.get("/", getAllSpeakers);

router.get("/:speakerId", getSpeakerById);

router.put("/:speakerId", upload.single("images"), updateSpeakerById);

router.delete("/:speakerId", deleteSpeakerById);

export default router;
