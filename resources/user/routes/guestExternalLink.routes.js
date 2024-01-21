import express from "express";
import GuestExternalLinkController from "../controllers/guestExternalLink.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";

const router = express.Router();
const guestExternalLinkController = new GuestExternalLinkController();

router.post("/", isAuthenticated, guestExternalLinkController.createguestExternalLink);
router.get("/", isAuthenticated, guestExternalLinkController.getguestExternalLinkByGuestId);
router.put("/:guestExternalLinkId", isAuthenticated, guestExternalLinkController.updateguestExternalLink);
router.delete("/:guestExternalLinkId", isAuthenticated, guestExternalLinkController.deleteguestExternalLink);

export default router;