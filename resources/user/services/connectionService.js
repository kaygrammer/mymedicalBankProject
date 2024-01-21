import Connection from "../models/connection.js";

class ConnectionService {
  async createConnectionRequest(senderId, recipientId) {
    const existingRequest = await Connection.findOne({
      user1: senderId,
      user2: recipientId,
      status: "pending",
    });

    if (existingRequest) {
      throw new Error("Connection request already sent");
    }
    const newConnection = new Connection({
      user1: senderId,
      user2: recipientId,
      status: "pending",
    });

    await newConnection.save();
  }

  async acceptConnectionRequest(senderId, recipientId) {
    console.log(`this is sender: ${senderId}`);
    console.log(`this is reciever: ${recipientId}`);
    const connectionRequest = await Connection.findOne({
      user1: senderId,
      user2: recipientId,
      status: "pending",
    });

    if (!connectionRequest) {
      throw new Error("Connection request not found");
    }

    connectionRequest.status = "accepted";
    await connectionRequest.save();

    // Implement logic to establish the connection here
    // Update both users' connection lists or any other required actions

    await Connection.findOneAndDelete({
      user1: senderId,
      user2: recipientId,
      status: "pending",
    });
  }

  async declineConnectionRequest(senderId, recipientId) {
    const deletedConnection = await Connection.findOneAndDelete({
      user1: senderId,
      user2: recipientId,
      status: "pending",
    });

    if (!deletedConnection) {
      throw new Error("Connection request not found");
    }
  }

  async getPendingRequests(userId) {
    const requests = await Connection.find({
      user2: userId,
      status: "pending",
    })
      .populate("user1")
      .populate("user2");
    return requests;
  }

  async getAcceptedRequests(userId) {
    const requests = await Connection.find({
      $or: [
        { user1: userId, status: "accepted" },
        { user2: userId, status: "accepted" },
      ],
    }).populate("user2").populate("user1");
    return requests;
  }
}

export default ConnectionService;
