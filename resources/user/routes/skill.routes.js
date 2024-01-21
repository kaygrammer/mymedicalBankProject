import express from "express";
import guestSkillController from "../../user/controllers/guestSkillController.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";

const router = express.Router();
const guestController = new guestSkillController();

router.post("/addSkill", isAuthenticated, guestController.createSkill);

router.get("/getSkills", isAuthenticated, guestController.getSkillsByUserId);

router.put(
  "/updateSkill/:skillId",
  isAuthenticated,
  guestController.updateSkill
);

router.delete(
  "/deleteSkill/:skillId",
  isAuthenticated,
  guestController.deleteSkill
);

router.get("/getSkill/:skillId", isAuthenticated, guestController.getSkillById);

export default router;
