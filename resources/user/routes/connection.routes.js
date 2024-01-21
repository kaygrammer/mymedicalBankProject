import express from "express";
import ConnectionController from "../controllers/connectionController.js";
import isAuthenticated from "../../../middleware/isAuthenticated.js";

const router = express.Router();
const connectionController = new ConnectionController();

router.post(
  "/send-request",
  isAuthenticated,
  connectionController.sendConnectionRequest
);

router.post(
  "/accept-request",
  isAuthenticated,
  connectionController.acceptConnectionRequest
);

router.post(
  "/decline-request",
  isAuthenticated,
  connectionController.declineConnectionRequest
);

router.get(
    "/pending-requests",
    isAuthenticated,
    connectionController.getPendingRequests
  );
  
  router.get(
    "/accepted-requests",
    isAuthenticated,
    connectionController.getAcceptedRequests
  );

export default router;