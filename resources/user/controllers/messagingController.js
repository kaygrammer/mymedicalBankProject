import ChatMessageService from "../services/messageService.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";

const chatMessageService = new ChatMessageService();

class ChatMessageController {
  async sendMessage(req, res) {
    try {
      const { senderId, recipientId, text } = req.body;
      const newMessage = await chatMessageService.sendMessage(
        senderId,
        recipientId,
        text
      );
      return successResMsg(res, 200, "Message sent successfully", newMessage);
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }

  async getMessagesBetweenUsers(req, res) {
    try {
      const { user1Id, user2Id } = req.params;
      const messages = await chatMessageService.getMessagesBetweenUsers(
        user1Id,
        user2Id
      );
      return successResMsg(
        res,
        200,
        "Messages retrieved successfully",
        messages
      );
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }

  async getRecentMessagesForUser(req, res) {
    try {
      const { userId } = req.params;
      const recentMessages = await chatMessageService.getRecentMessagesForUser(
        userId
      );
      return successResMsg(
        res,
        200,
        "Recent messages retrieved successfully",
        recentMessages
      );
    } catch (error) {
      return errorResMsg(res, 500, error.message);
    }
  }
}

export default ChatMessageController;
