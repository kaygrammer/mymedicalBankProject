import Niche from "../../user/models/niche.js";
import Guest from "../../user/models/guest.js";

class GuestService {
  async addNiche(userId, niches) {
    try {
      const guest = await Guest.findById(userId);

      if (!guest) {
        throw new Error("Guest not found");
      }

      const addedNiches = [];

      for (const niche of niches) {
        let existingNiche = await Niche.findOne({ niche });

        if (!existingNiche) {
          existingNiche = new Niche({ niche });
          await existingNiche.save();
        }

        guest.niches.push(existingNiche);
        addedNiches.push(existingNiche);
      }

      await guest.save();

      return addedNiches;
    } catch (error) {
      throw new Error(`Error adding niches: ${error.message}`);
    }
  }

  async getAllNiches(guestId) {
    const niches = await Niche.find({ guest: guestId });
    return niches;
  }

  async updateNiche(guestId, nicheId, updatedNiche) {
    const niche = await Niche.findOneAndUpdate(
      { guest: guestId, _id: nicheId },
      updatedNiche,
      { new: true }
    );

    if (!niche) {
      throw new Error("Niche not found");
    }

    return niche;
  }

  async deleteNiche(guestId, nicheId) {
    const niche = await Niche.findOneAndRemove({
      guest: guestId,
      _id: nicheId,
    });

    if (!niche) {
      throw new Error("Niche not found");
    }

    return niche;
  }

  async getGuestsByNiche(niches) {
    try {
      const guests = await Guest.find({ niches: { $in: niches } }).exec();
      return guests;
    } catch (error) {
      throw new Error("Error while fetching guests by niche: " + error.message);
    }
  }
}

export default GuestService;
