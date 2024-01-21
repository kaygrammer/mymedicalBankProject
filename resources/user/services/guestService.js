import mongoose from "mongoose";
import Guest from "../../user/models/guest.js";
import EmailService from "../../../utils/email/email-sender.js";
import generateOtp from "../../../utils/otp/otpGenerator.js";
import { createJwtToken } from "../../../middleware/authUtils.js";
import { passwordHash, passwordCompare } from "../../../middleware/hashing.js";
import Connection from "../models/connection.js";

class GuestService {
  constructor() {
    this.emailService = new EmailService();
  }

  async signUpWithEmail(email) {
    const guest = await Guest.create({ email });
    return guest;
  }

  async signInWithEmail(email) {
    const guest = await Guest.findOne({ email });

    if (!guest) {
      throw new Error("Guest not found");
    }

    // Generate OTP
    const otp = generateOtp();

    guest.emailOtp = otp;
    await guest.save();

    await this.emailService.sendEmailVerification(guest.email, otp);

    return guest;
  }

  async confirmEmail(email, otp) {
    const guest = await Guest.findOne({ email, emailOtp: otp });

    if (!guest) {
      throw new Error("Invalid email or OTP");
    }

    if (guest.emailOtp !== otp) {
      throw new Error("Invalid OTP");
    }

    // Mark the email as confirmed and remove the OTP
    guest.isEmailConfirmed = true;
    guest.emailOtp = undefined;
    await guest.save();

    // Create a JWT token for the user
    const token = createJwtToken({ userId: guest._id, email: guest.email });

    return { guest, token };
  }

  async setPassword(email, password) {
    const guest = await Guest.findOne({ email, isEmailConfirmed: true });

    if (!guest) {
      throw new Error("Guest not found or email not confirmed");
    }
    const hashedPassword = passwordHash(password);
    guest.password = await hashedPassword;
    await guest.save();

    return guest;
  }

  async signInWithEmailAndPassword(email, password) {
    const guest = await Guest.findOne({ email, isEmailConfirmed: true });

    if (!guest) {
      throw new Error("Guest not found or email not confirmed");
    }
    if (guest.password === "" || guest.password === undefined) {
      throw new Error(
        "password not set yet, please go and create a pasword and try again"
      );
    }
    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await passwordCompare(password, guest.password);

    if (!isPasswordMatch) {
      throw new Error("Invalid password");
    }

    return guest;
  }

  async forgotPassword(email) {
    const guest = await Guest.findOne({ email });

    if (!guest) {
      throw new Error("Guest not found");
    }

    // Generate a 6-digit OTP
    const otp = generateOtp(6);

    guest.emailOtp = otp;
    await guest.save();

    await this.emailService.sendPasswordResetOtp(email, otp);

    return true;
  }

  async verifyResetOTP(email, resetToken) {
    const guest = await Guest.findOne({ email, emailOtp: resetToken });

    if (!guest) {
      throw new Error("Invalid OTP");
    }

    return true;
  }

  async resetPassword(email, newPassword) {
    const guest = await Guest.findOne({ email });

    if (!guest) {
      throw new Error("Guest not found");
    }

    const hashedPassword = await passwordHash(newPassword);
    guest.password = hashedPassword;

    guest.emailOtp = undefined;

    await guest.save();

    return true;
  }

  async setAttendanceMode(email, attendanceMode) {
    const guest = await Guest.findOne({ email });

    if (!guest) {
      throw new Error("Guest not found");
    }

    guest.attendanceMode = attendanceMode;
    await guest.save();

    return guest;
  }

  async deleteUserByEmail(email) {
    const deletedUser = await Guest.findOneAndDelete({ email });
    return deletedUser;
  }

  async getGuest(email) {
    try {
      const guest = await Guest.findOne({ email })
        .populate("socialMedia")
        .populate("skills")
        .populate("externalLinks")
        .exec();

      if (!guest) {
        throw new Error("Guest not found");
      }

      return guest;
    } catch (error) {
      throw error;
    }
  }

  async getGuestById(guestId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(guestId)) {
        throw new Error("Invalid Guest ID");
      }
      const guest = await Guest.findById(guestId)
        .populate("socialMedia")
        .populate("skills")
        .populate("externalLinks")
        .exec();

      if (!guest) {
        throw new Error("Guest not found");
      }

      return guest;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    const users = await Guest.find();
    return users;
  }

  async editProfileFields(email, newProfileFields) {
    try {
      const guest = await Guest.findOne({ email });

      if (!guest) {
        throw new Error("Guest not found");
      }

      if (newProfileFields.fullName) {
        guest.fullName = newProfileFields.fullName;
      }

      if (newProfileFields.jobTitle) {
        guest.jobTitle = newProfileFields.jobTitle;
      }

      if (newProfileFields.placeOfWork) {
        guest.placeOfWork = newProfileFields.placeOfWork;
      }

      if (newProfileFields.profilePic) {
        guest.profilePic = newProfileFields.profilePic;
      }

      if (newProfileFields.aboutMe) {
        guest.aboutMe = newProfileFields.aboutMe;
      }

      if (newProfileFields.skills) {
        guest.skills = newProfileFields.skills;
      }

      if (newProfileFields.socialMedia) {
        guest.socialMedia = newProfileFields.socialMedia;
      }

      if (newProfileFields.externalLinks) {
        guest.externalLinks = newProfileFields.externalLinks;
      }

      await guest.save();

      return guest;
    } catch (error) {
      throw error;
    }
  }

  async getPeopleYouMayKnow(userId) {
    try {
      const user = await Guest.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      const userNiches = user.niches.map((niche) => niche._id);

      const connections = await Connection.find({
        $or: [
          { user1: userId, status: "accepted" },
          { user2: userId, status: "accepted" },
        ],
      });

      const connectedUserIds = connections.flatMap((connection) => {
        return connection.user1.equals(userId)
          ? connection.user2
          : connection.user1;
      });

      const potentialConnections = await Guest.find({
        _id: { $nin: connectedUserIds.concat(userId) },
        niches: { $in: userNiches },
      });

      return potentialConnections;
    } catch (error) {
      throw new Error(`Error fetching potential connections: ${error.message}`);
    }
  }
}

export default GuestService;
