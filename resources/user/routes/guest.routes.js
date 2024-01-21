import express from "express";
import GuestController from "../../user/controllers/guestController.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";
import {upload} from "../../../utils/Pic/multer.js";

const router = express.Router();
const guestController = new GuestController();

// Route for signing in with email
router.post("/sign-in", guestController.signIn); //first time user
router.post("/sign-up", guestController.signUpWithEmail);
router.post("/confirm-email", guestController.confirmEmail);
router.post("/set-password", isAuthenticated, guestController.setPassword);
router.post("/email-sign-in", guestController.signInWithEmailAndPassword);
router.post("/forgot-password", guestController.forgotPassword);
router.post("/verify-reset-otp", guestController.verifyResetOTP);
router.post("/reset-password", guestController.resetPassword);
router.post(
  "/set-attendance-mode",
  isAuthenticated,
  guestController.setAttendanceMode
);
router.delete("/delete", guestController.deleteUserByEmail);
router.get("/get-all-users", guestController.getAllUsers);
router.get("/get-a-guest", isAuthenticated, guestController.getGuest);
router.get("/get-user/:guestId", isAuthenticated, guestController.getGuestById);
router.put(
  "/editProfileField",
  isAuthenticated,
  guestController.editProfileFields
);
router.put("/editAbout", isAuthenticated, guestController.editAboutUs);

router.post(
  "/edit-profile-pic",
  isAuthenticated,
  upload.single("profilePic"),
  guestController.editProfilePic
);

router.get("/people-you-may-know", isAuthenticated, guestController.getPeopleYouMayKnow);

export default router;
