import express from "express";
import SocialMediaController from "../controllers/guestSocialMedia.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";

const router = express.Router();
const socialMediaController = new SocialMediaController();

router.post("/", isAuthenticated, socialMediaController.createSocialMedia);
router.get("/", isAuthenticated, socialMediaController.getSocialMediaByGuestId);
router.put("/:socialMediaId", isAuthenticated, socialMediaController.updateSocialMedia);
router.delete("/:socialMediaId", isAuthenticated, socialMediaController.deleteSocialMedia);

export default router;