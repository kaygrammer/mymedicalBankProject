import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import Events from "../models/events.models.js";
import cloudinary from "../../../utils/Pic/cloudinary.js";
import { eventSchema } from "../../../utils/validation/validation.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const saveEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventPic,
      eventInfo,
      totalAttendance,
      Date,
      location,
      eventVideoUrl,
      eventHighlight,
      summary,
      speakers,
      eventGallery,
      partners
    } = req.body;
    // const { error } = eventSchema.validate(req.body);
    // if (error) {
    //   return errorResMsg(res, 404, error.message);
    // }
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new event
    const event = new Events({
      eventName,
      eventPic: result.secure_url,
      eventInfo,
      totalAttendance,
      Date,
      location,
      summary,
      eventHighlight,
      eventVideoUrl,
      speakers,
      eventGallery,
      partners
    });

    // Save the event to the database
    await event.save();
    return successResMsg(res, 201, {
      message: "Event added successfully",
      eventId: event._id,
      eventUrl: event.eventPic
    });
  } catch (error) {
    console.error("Error during event save:", error);
    return errorResMsg(res, 500, error);
  }
};

const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Events.findById(eventId).populate("speakers").
    populate("eventGallery")
    .populate("partners");

    if (!event) {
      return errorResMsg(res, 404, "Event not found");
    }

    return successResMsg(res, 200, { event });
  } catch (error) {
    console.error("Error while fetching event by ID:", error);
    return errorResMsg(res, 500, error);
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Events.find().populate("speakers").
    populate("eventGallery")
    .populate("partners");;

    return successResMsg(res, 200, { events });
  } catch (error) {
    console.error("Error while fetching all events:", error);
    return errorResMsg(res, 500, error);
  }
};

const deleteEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await Events.findByIdAndRemove(eventId);

    if (!event) {
      return errorResMsg(res, 404, "Event not found");
    }

    return successResMsg(res, 200, { message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error while deleting event by ID:", error);
    return errorResMsg(res, 500, error);
  }
};

export { saveEvent, getEventById, getAllEvents, deleteEventById };
