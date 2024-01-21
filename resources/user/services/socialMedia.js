import SocialMedia from "../models/socialMedia.js";
import Guest from "../../user/models/guest.js";

class SocialMediaService {
  async createSocialMedia(guestId, title, link) {
    try {
      const guest = await Guest.findById(guestId);
      if (!guest) {
        throw new Error("Guest not found");
      }
      const socialMedia = await SocialMedia.create({
        guest: guestId,
        title,
        link,
      });
      guest.socialMedia.push(socialMedia);
      await guest.save();
      return socialMedia;
    } catch (error) {
      throw error;
    }
  }

  async getSocialMediaByGuestId(guestId) {
    try {
      const socialMedia = await SocialMedia.find({ guest: guestId });
      return socialMedia;
    } catch (error) {
      throw error;
    }
  }

  async updateSocialMedia(id, title, link) {
    try {
      const socialMedia = await SocialMedia.findByIdAndUpdate(
        id,
        { title, link },
        { new: true }
      );
      return socialMedia;
    } catch (error) {
      throw error;
    }
  }

  async deleteSocialMedia(id) {
    try {
      await SocialMedia.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default SocialMediaService;
