import express from "express";
import {upload} from "../../../utils/Pic/multer.js";
import { saveEvent, getEventById, getAllEvents, deleteEventById } from "../controllers/event.contollers.js";

const router = express.Router();

router.post("/create-event", upload.single("images"), saveEvent);
router.get("/event/:eventId", getEventById);
router.get("/events", getAllEvents);
router.delete("/event/:eventId", deleteEventById);

export default router;
