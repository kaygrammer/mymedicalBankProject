import EventGallery from "../models/eventGallery.js";
import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import cloudinary from "../../../utils/Pic/cloudinary.js";

// Create a new event gallery item
const createEventGalleryItem = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const eventGalleryItem = new EventGallery({
      name,
      eventImage: result.secure_url,
    });

    await eventGalleryItem.save();

    return successResMsg(res, 201, {
      message: "Event gallery item created successfully",
      eventGalleryItemId: eventGalleryItem._id,
    });
  } catch (error) {
    console.error("Error creating event gallery item:", error);
    return errorResMsg(res, 500, error.message || "Internal Server Error");
  }
};

// Get all event gallery items
const getAllEventGalleryItems = async (req, res) => {
  try {
    const eventGalleryItems = await EventGallery.find();

    return successResMsg(res, 200, { eventGalleryItems });
  } catch (error) {
    console.error("Error fetching all event gallery items:", error);
    return errorResMsg(res, 500, error.message || "Internal Server Error");
  }
};

// Get event gallery item by ID
const getEventGalleryItemById = async (req, res) => {
  try {
    const eventGalleryItemId = req.params.eventGalleryItemId;
    const eventGalleryItem = await EventGallery.findById(eventGalleryItemId);

    if (!eventGalleryItem) {
      return errorResMsg(res, 404, "Event gallery item not found");
    }

    return successResMsg(res, 200, { eventGalleryItem });
  } catch (error) {
    console.error("Error fetching event gallery item by ID:", error);
    return errorResMsg(res, 500, error.message || "Internal Server Error");
  }
};

// Update event gallery item by ID
const updateEventGalleryItemById = async (req, res) => {
  try {
    const eventGalleryItemId = req.params.eventGalleryItemId;
    const { name } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const updatedEventGalleryItem = await EventGallery.findByIdAndUpdate(
      eventGalleryItemId,
      { name, eventImage: result.secure_url },
      { new: true } // Return the updated event gallery item
    );

    if (!updatedEventGalleryItem) {
      return errorResMsg(res, 404, "Event gallery item not found");
    }

    return successResMsg(res, 200, {
      message: "Event gallery item updated successfully",
      eventGalleryItem: updatedEventGalleryItem,
    });
  } catch (error) {
    console.error("Error updating event gallery item by ID:", error);
    return errorResMsg(res, 500, error.message || "Internal Server Error");
  }
};

// Delete event gallery item by ID
const deleteEventGalleryItemById = async (req, res) => {
  try {
    const eventGalleryItemId = req.params.eventGalleryItemId;
    const deletedEventGalleryItem = await EventGallery.findByIdAndRemove(
      eventGalleryItemId
    );

    if (!deletedEventGalleryItem) {
      return errorResMsg(res, 404, "Event gallery item not found");
    }

    return successResMsg(res, 200, "Event gallery item deleted successfully");
  } catch (error) {
    console.error("Error deleting event gallery item by ID:", error);
    return errorResMsg(res, 500, error.message || "Internal Server Error");
  }
};

export {
  createEventGalleryItem,
  getAllEventGalleryItems,
  getEventGalleryItemById,
  updateEventGalleryItemById,
  deleteEventGalleryItemById,
};
