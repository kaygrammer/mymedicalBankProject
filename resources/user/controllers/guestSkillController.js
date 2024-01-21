import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import SkillService from "../services/skillService.js";

const skillService = new SkillService();

class SkillController {
    async createSkill(req, res, next) {
        try {
          const { userId } = req.user;
          const { skillName } = req.body;
      
          const skill = await skillService.createSkill(userId, skillName);
      
          return successResMsg(res, 201, {
            message: "Skill created successfully",
            skill,
          });
        } catch (error) {
          return errorResMsg(res, 500, error.message);
        }
      }

  async getSkillsByUserId(req, res, next) {
    try {
      const { userId } = req.user;

      const skills = await skillService.getSkillsByUserId(userId);

      return successResMsg(res, 200, {
        message: "Skills retrieved successfully",
        skills,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }

  async getSkillById(req, res, next) {
    try {
      const { skillId } = req.params;

      const skill = await skillService.getSkillById(skillId);

      if (!skill) {
        return errorResMsg(res, 404, "Skill not found");
      }

      return successResMsg(res, 200, {
        message: "Skill retrieved successfully",
        skill,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }

  async updateSkill(req, res, next) {
    try {
      const { skillId } = req.params;
      const { skillName } = req.body;

      const updatedSkill = await skillService.updateSkill(skillId, skillName);

      if (!updatedSkill) {
        return errorResMsg(res, 404, "Skill not found");
      }

      return successResMsg(res, 200, {
        message: "Skill updated successfully",
        skill: updatedSkill,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }

  async deleteSkill(req, res, next) {
    try {
      const { skillId } = req.params;

      const deletedSkill = await skillService.deleteSkill(skillId);

      if (!deletedSkill) {
        return errorResMsg(res, 404, "Skill not found");
      }

      return successResMsg(res, 200, {
        message: "Skill deleted successfully",
        skill: deletedSkill,
      });
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }
}

export default SkillController;