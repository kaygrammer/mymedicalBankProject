import ChatMessage from "../models/chatMessage.js";

class ChatController {
  async sendMessage(req, res) {
    try {
      const { recipientId, text } = req.body;
      const { userId } = req.user;

      const newMessage = new ChatMessage({
        sender: userId,
        recipient: recipientId,
        text,
      });

      await newMessage.save();

      // Emit the new message to the recipient via Socket.io
      io.to(recipientId).emit("new-message", newMessage);

      return res.status(200).json({ message: "Message sent successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      const { recipientId } = req.params;
      const { userId } = req.user;

      // Fetch messages between the sender and recipient
      const messages = await ChatMessage.find({
        $or: [
          { sender: userId, recipient: recipientId },
          { sender: recipientId, recipient: userId },
        ],
      }).sort({ createdAt: 1 });

      return res.status(200).json(messages);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default ChatController;