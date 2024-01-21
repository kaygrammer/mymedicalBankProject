import express from "express";
import http from "http";
import { Server } from "socket.io";
import routes from "./resources/user/routes/routes.js";
import guestRoute from "./resources/user/routes/guest.routes.js";
import guestNicheRoute from "./resources/user/routes/guestNiche.routes.js";
import pastEventRoute from "./resources/user/routes/event.routes.js";
import connectionRoute from "./resources/user/routes/connection.routes.js";
import speakersRoute from "./resources/user/routes/speakers.routes.js";
import partnersRoute from "./resources/user/routes/partner.routes.js";
import galleryRoute from "./resources/user/routes/eventGallery.routes.js";
import skillRoute from "./resources/user/routes/skill.routes.js";
import externalLinkRoute from "./resources/user/routes/guestExternalLink.routes.js";
import guestSocialMediaRoute from "./resources/user/routes/guestSocialMedia.routes.js";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the app 💵💵💵 ");
});

app.use("/user", routes);
app.use("/api/v1/guest", guestRoute);
app.use("/api/v1/guest/niche", guestNicheRoute);
app.use("/api/v1/guest/event", pastEventRoute);
app.use("/api/v1/guest/connection", connectionRoute);
app.use("/api/v1/guest/speakers", speakersRoute);
app.use("/api/v1/guest/partners", partnersRoute);
app.use("/api/v1/guest/skill", skillRoute);
app.use("/api/v1/guest/socialMedia", guestSocialMediaRoute);
app.use("/api/v1/guest/externalLink", externalLinkRoute);
app.use("/api/v1/guest/eventGallery", galleryRoute);

const io = new Server(server);

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected to Socket.io");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected from Socket.io");
  });

  // Add your Socket.io event handlers here
  socket.on("some-event", (data) => {
    console.log("Received some-event with data:", data);
    // Emit events to connected clients as needed
    socket.emit("another-event", "Some data to send to the client");
  });
});

export default app;
