import express from "express";
import GuestController from "../../user/controllers/guestNicheController.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";

const router = express.Router();
const guestController = new GuestController();


router.post("/add-niche", isAuthenticated, guestController.addNiche);

router.get("/get-niche/:nicheId", isAuthenticated, guestController.getNiche);

router.get("/get-all-niches", isAuthenticated, guestController.getAllNiches);

router.put("/update-niche/:nicheId", isAuthenticated, guestController.updateNiche);

router.delete("/delete-niche/:nicheId", isAuthenticated, guestController.deleteNiche);

router. post("/search-guests-by-niche",  guestController.searchByNiche);

export default router;