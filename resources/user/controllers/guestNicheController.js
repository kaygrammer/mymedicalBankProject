import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import GuestService from "../services/guestNicheService.js";

const guestService = new GuestService();

class GuestController {
  async addNiche(req, res, next) {
    try {
      const { niches } = req.body;
      const { userId } = req.user;
  
      const newNiches = await guestService.addNiche(userId, niches);
  
      return successResMsg(res, 201, {
        message: "Niches added successfully",
        niches: newNiches,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getNiche(req, res, next) {
    try {
      const { nicheId } = req.params;
      const { userId } = req.user;

      const niche = await guestService.getNiche(userId, nicheId);

      return successResMsg(res, 200, {
        message: "Niche retrieved successfully",
        niche,
      });
    } catch (error) {
      return errorResMsg(res, 404, error.message);
    }
  }

  async updateNiche(req, res, next) {
    try {
      const { nicheId } = req.params;
      const { userId } = req.user;
      const updatedNiche = req.body;

      const niche = await guestService.updateNiche(userId, nicheId, updatedNiche);

      return successResMsg(res, 200, {
        message: "Niche updated successfully",
        niche,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async deleteNiche(req, res, next) {
    try {
      const { nicheId } = req.params;
      const { userId } = req.user;

      const niche = await guestService.deleteNiche(userId, nicheId);

      return successResMsg(res, 200, {
        message: "Niche deleted successfully",
        niche,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getAllNiches(req, res, next) {
    try {
        const { userId } = req.user;

      const niches = await guestService.getAllNiches(userId);

      return successResMsg(res, 200, {
        message: "All niches retrieved successfully",
        niches,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async searchByNiche(req, res, next) {
    try {
      const {niches} = req.body;
    
      if (!niches || !Array.isArray(niches) || niches.length === 0) {
        return errorResMsg(res, 400, "Please provide at least one niche in an array to search for.");
      }
  
      const guests = await guestService.getGuestsByNiche(niches);
  
      return successResMsg(res, 200, {
        message: "Users with the specified niches",
        users: guests,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }
}


export default GuestController;