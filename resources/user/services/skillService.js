import Skill from "../../user/models/guestSkill.js";
import Guest from "../../user/models/guest.js";

class SkillService {
  async createSkill(userId, skill) {
    try {
      const guest = await Guest.findById(userId);
      if (!guest) {
        throw new Error("Guest not found");
      }
      const skillCount = await Skill.countDocuments({ guest: userId });
      if (skillCount >= 5) {
        throw new Error("User already has 5 skills, cannot add more.");
      }
      const createdSkill = await Skill.create({ guest: userId, skill });
      guest.skills.push(createdSkill);
      await guest.save();
      return createdSkill;
    } catch (error) {
      throw error;
    }
  }
  async getSkillsByUserId(userId) {
    try {
      const skills = await Skill.find({ guest: userId });
      return skills;
    } catch (error) {
      throw error;
    }
  }

  async getSkillById(skillId) {
    try {
      const skill = await Skill.findById(skillId);
      return skill;
    } catch (error) {
      throw error;
    }
  }

  async updateSkill(skillId, updatedSkillName) {
    try {
      const skill = await Skill.findByIdAndUpdate(
        skillId,
        { skillName: updatedSkillName },
        { new: true }
      );
      return skill;
    } catch (error) {
      throw error;
    }
  }

  async deleteSkill(skillId) {
    try {
      const skill = await Skill.findByIdAndDelete(skillId);
      return skill;
    } catch (error) {
      throw error;
    }
  }
}

export default SkillService;
