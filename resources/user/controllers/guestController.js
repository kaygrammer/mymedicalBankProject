import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import GuestService from "../services/guestService.js";
import { createJwtToken } from "../../../middleware/authUtils.js";
import { registraionSchema } from "../../../utils/validation/validation.js";
import cloudinary from "../../../utils/Pic/cloudinary.js";

const guestService = new GuestService();

class GuestController {
  async signUpWithEmail(req, res, next) {
    try {
      const { email } = req.body;

      //validate request body
      const { error } = registraionSchema.validate(req.body);
      if (error) {
        return errorResMsg(res, 404, error.message);
      }

      const guest = await guestService.signUpWithEmail(email);

      return successResMsg(res, 200, {
        message: "Email added to database",
        guest,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }
  async signIn(req, res, next) {
    try {
      const { email } = req.body;

      //validate request body
      const { error } = registraionSchema.validate(req.body);
      if (error) {
        return errorResMsg(res, 404, error.message);
      }

      const guest = await guestService.signInWithEmail(email);

      return successResMsg(res, 200, {
        message: "Email OTP sent successfully",
        guest,
      });
    } catch (error) {
      return errorResMsg(res, 404, error.message);
    }
  }

  async confirmEmail(req, res, next) {
    try {
      const { email, otp } = req.body;

      //validate request body
      const { error } = registraionSchema.validate(req.body);
      if (error) {
        return errorResMsg(res, 404, error.message);
      }

      const { guest, token } = await guestService.confirmEmail(email, otp);

      return successResMsg(res, 200, {
        message: "Email confirmed successfully",
        guest: guest._id,
        email: guest.email,
        token,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async setPassword(req, res, next) {
    try {
      const { password, confirmPassword } = req.body;
      const { email } = req.user;

      if (password !== confirmPassword) {
        throw new Error("password do not match, please checkand try again");
      }

      const guest = await guestService.setPassword(email, password);

      return successResMsg(res, 200, {
        message: "Password set successfully",
        guest: guest._id,
        email: guest.email,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async signInWithEmailAndPassword(req, res, next) {
    try {
      const { email, password } = req.body;

      const guest = await guestService.signInWithEmailAndPassword(
        email,
        password
      );

      const token = createJwtToken({ userId: guest._id, email: guest.email });

      return successResMsg(res, 200, {
        message: "Sign-in successful",
        guest: guest._id,
        email: guest.email,
        token,
      });
    } catch (error) {
      return errorResMsg(res, 401, error.message);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;

      await guestService.forgotPassword(email);

      return successResMsg(res, 200, {
        message: "Password reset OTP sent to your email",
      });
    } catch (error) {
      return errorResMsg(res, 404, error.message);
    }
  }

  async verifyResetOTP(req, res, next) {
    try {
      const { email, resetToken } = req.body;

      await guestService.verifyResetOTP(email, resetToken);

      return successResMsg(res, 200, {
        message: "OTP verified successfully",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email, newPassword, confirmPassword } = req.body;

      if (newPassword !== confirmPassword) {
        throw new Error("Password do not match");
      }

      await guestService.resetPassword(email, newPassword);

      return successResMsg(res, 200, {
        message: "You’ve successfully reset your password",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async setAttendanceMode(req, res, next) {
    try {
      const { attendanceMode } = req.body;
      const { email } = req.user;

      await guestService.setAttendanceMode(email, attendanceMode);

      return successResMsg(res, 200, {
        message: "Attendance mode set successfully",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async deleteUserByEmail(req, res, next) {
    try {
      const { email } = req.body;

      const deletedUser = await guestService.deleteUserByEmail(email);

      if (!deletedUser) {
        throw new Error("User not found");
      }

      return successResMsg(res, 200, {
        message: "User deleted successfully",
        user: deletedUser,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await guestService.getAllUsers();

      return successResMsg(res, 200, {
        message: "All users retrieved successfully",
        users,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getGuest(req, res, next) {
    try {
      const { email } = req.user;

      const guest = await guestService.getGuest(email);

      return successResMsg(res, 200, {
        message: "Guest retrieved successfully",
        guest,
      });
    } catch (error) {
      return errorResMsg(res, 404, error.message);
    }
  }

  async getGuestById(req, res, next) {
    try {
      const { email } = req.user;
      const {guestId} = req.params

      const guest = await guestService.getGuestById(guestId);

      return successResMsg(res, 200, {
        message: "Guest retrieved successfully",
        guest,
      });
    } catch (error) {
      return errorResMsg(res, 404, error.message);
    }
  }

  async editProfileFields(req, res, next) {
    try {
      const { email } = req.user;
      const { fullName, jobTitle, placeOfWork } = req.body;
      const newProfileFields = { fullName, jobTitle, placeOfWork };

      await guestService.editProfileFields(email, newProfileFields);

      return successResMsg(res, 200, {
        message: "Profile fields updated successfully",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async editAboutUs(req, res, next) {
    try {
      const { email } = req.user;
      const { aboutMe } = req.body;
      const newProfileFields = { aboutMe };

      await guestService.editProfileFields(email, newProfileFields);

      return successResMsg(res, 200, {
        message: "Profile fields updated successfully",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async editProfilePic(req, res, next) {
    try {
      const { email } = req.user;
      const result = await cloudinary.uploader.upload(req.file.path);
      const newProfileFields = { profilePic: result.secure_url };

      await guestService.editProfileFields(email, newProfileFields);

      return successResMsg(res, 200, {
        message: "Profile fields updated successfully",
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getPeopleYouMayKnow(req, res, next) {
    try {
      const { userId } = req.user;

      const potentialConnections = await guestService.getPeopleYouMayKnow(userId);

      return successResMsg(res, 200, {
        message: "Potential connections retrieved successfully",
        potentialConnections,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }
}

export default GuestController;
