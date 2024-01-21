import ConnectionService from "../services/connectionService.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";

const connectionService = new ConnectionService();

class ConnectionController {
  async sendConnectionRequest(req, res, next) {
    try {
      const { userId } = req.user;
      const { recipientId } = req.body;

      // Create a connection request
      await connectionService.createConnectionRequest(userId, recipientId);

      // Return a success response
      return res.status(201).json({
        status: "success",
        message: "Connection request sent successfully",
      });
    } catch (error) {
      // Handle errors and return an error response
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async acceptConnectionRequest(req, res, next) {
    try {
      const { userId } = req.user;
      const { senderId } = req.body;

      // Accept the connection request
      await connectionService.acceptConnectionRequest(senderId, userId);

      // Return a success response
      return res.status(200).json({
        status: "success",
        message: "Connection request accepted successfully",
      });
    } catch (error) {
      // Handle errors and return an error response
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async declineConnectionRequest(req, res, next) {
    try {
      const { userId } = req.user;
      const { senderId } = req.body;

      // Decline the connection request
      await connectionService.declineConnectionRequest(senderId, userId);

      // Return a success response
      return res.status(200).json({
        status: "success",
        message: "Connection request declined successfully",
      });
    } catch (error) {
      // Handle errors and return an error response
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getPendingRequests(req, res, next) {
    try {
      const { userId } = req.user;
      const pendingRequests = await connectionService.getPendingRequests(userId);
      return successResMsg(res, 200, {
        message: "Pending connection requests",
        requests: pendingRequests,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }

  async getAcceptedRequests(req, res, next) {
    try {
      const { userId } = req.user;
      const acceptedRequests = await connectionService.getAcceptedRequests(
        userId
      );
      return successResMsg(res, 200, {
        message: "Accepted connection requests",
        requests: acceptedRequests,
      });
    } catch (error) {
      return errorResMsg(res, 400, error.message);
    }
  }
}

export default ConnectionController;
