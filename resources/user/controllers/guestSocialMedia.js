import SocialMediaService from "../services/socialMedia.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";

const socialMediaService = new SocialMediaService();

class SocialMediaController {
  async createSocialMedia(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, link } = req.body;

      const socialMedia = await socialMediaService.createSocialMedia(
        userId,
        title,
        link
      );

      return res.status(201).json({
        message: "Social Media created successfully",
        socialMedia,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getSocialMediaByGuestId(req, res, next) {
    try {
      const { userId } = req.user;

      const socialMedia = await socialMediaService.getSocialMediaByGuestId(userId);

      return res.status(200).json({
        message: "Social Media retrieved successfully",
        socialMedia,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateSocialMedia(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, link } = req.body;
      const { socialMediaId } = req.params;

      const socialMedia = await socialMediaService.updateSocialMedia(
        socialMediaId,
        title,
        link
      );

      return res.status(200).json({
        message: "Social Media updated successfully",
        socialMedia,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteSocialMedia(req, res, next) {
    try {
      const { socialMediaId } = req.params;

      await socialMediaService.deleteSocialMedia(socialMediaId);

      return successResMsg(res, 200, {
        message: "Social media deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default SocialMediaController;