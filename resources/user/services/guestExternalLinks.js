import GuestExternalLink from "../models/guestExternalLink.js";
import Guest from "../../user/models/guest.js";

class guestExternalLinkService {
  async createguestExternalLink(guestId, title, link) {
    try {
      const guest = await Guest.findById(guestId);
      if (!guest) {
        throw new Error("Guest not found");
      }
      const guestExternalLink = await GuestExternalLink.create({
        guest: guestId,
        title,
        link,
      });
      guest.externalLinks.push(guestExternalLink);
      await guest.save();
      return guestExternalLink;
    } catch (error) {
      throw error;
    }
  }

  async getguestExternalLinkByGuestId(guestId) {
    try {
      const guestExternalLink = await GuestExternalLink.find({
        guest: guestId,
      });
      return guestExternalLink;
    } catch (error) {
      throw error;
    }
  }

  async updateguestExternalLink(id, title, link) {
    try {
      const guestExternalLink = await GuestExternalLink.findByIdAndUpdate(
        id,
        { title, link },
        { new: true }
      );
      return guestExternalLink;
    } catch (error) {
      throw error;
    }
  }

  async deleteguestExternalLink(id) {
    try {
      await GuestExternalLink.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default guestExternalLinkService;
