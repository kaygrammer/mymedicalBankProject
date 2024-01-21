import ChatMessage from "../models/chatMessage.js";

class ChatMessageService {
  async sendMessage(senderId, recipientId, text) {
    try {
      const newMessage = await ChatMessage.create({
        sender: senderId,
        recipient: recipientId,
        text: text,
      });
      return newMessage;
    } catch (error) {
      throw new Error(`Error sending message: ${error.message}`);
    }
  }

  async getMessagesBetweenUsers(user1Id, user2Id) {
    try {
      const messages = await ChatMessage.find({
        $or: [
          { sender: user1Id, recipient: user2Id },
          { sender: user2Id, recipient: user1Id },
        ],
      }).sort({ createdAt: 1 });
      return messages;
    } catch (error) {
      throw new Error(`Error retrieving messages: ${error.message}`);
    }
  }

  async getRecentMessagesForUser(userId) {
    try {
      // Find the most recent message for each conversation
      const recentMessages = await ChatMessage.aggregate([
        {
          $match: {
            $or: [{ sender: userId }, { recipient: userId }],
          },
        },
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$sender", userId] },
                "$recipient",
                "$sender",
              ],
            },
            message: { $first: "$$ROOT" },
          },
        },
        {
          $replaceRoot: { newRoot: "$message" },
        },
      ]);

      return recentMessages;
    } catch (error) {
      throw new Error(`Error retrieving recent messages: ${error.message}`);
    }
  }
}

export default ChatMessageService;