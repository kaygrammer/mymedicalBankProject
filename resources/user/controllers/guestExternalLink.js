import GuestExternalLinkService from "../services/guestExternalLinks.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";

const guestExternalLinkService = new GuestExternalLinkService();

class guestExternalLinkController {
  async createguestExternalLink(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, link } = req.body;

      const guestExternalLink = await guestExternalLinkService.createguestExternalLink(
        userId,
        title,
        link
      );

      return res.status(201).json({
        message: "External Linkcreated successfully",
        guestExternalLink,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getguestExternalLinkByGuestId(req, res, next) {
    try {
      const { userId } = req.user;

      const guestExternalLink = await guestExternalLinkService.getguestExternalLinkByGuestId(userId);

      return res.status(200).json({
        message: "External Linkretrieved successfully",
        guestExternalLink,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async updateguestExternalLink(req, res, next) {
    try {
      const { userId } = req.user;
      const { title, link } = req.body;
      const { guestExternalLinkId } = req.params;

      const guestExternalLink = await guestExternalLinkService.updateguestExternalLink(
        guestExternalLinkId,
        title,
        link
      );

      return res.status(200).json({
        message: "External Linkupdated successfully",
        guestExternalLink,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async deleteguestExternalLink(req, res, next) {
    try {
      const { guestExternalLinkId } = req.params;

      await guestExternalLinkService.deleteguestExternalLink(guestExternalLinkId);

      return successResMsg(res, 200, {
        message: "External Linkdeleted successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default guestExternalLinkController;