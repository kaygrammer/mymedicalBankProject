import express from 'express';
import {
  createEventGalleryItem,
  getAllEventGalleryItems,
  getEventGalleryItemById,
  updateEventGalleryItemById,
  deleteEventGalleryItemById,
} from '../controllers/eventGallery.js';
import {upload} from "../../../utils/Pic/multer.js"; 

const router = express.Router();

// Create a new event gallery item
router.post('/', upload.single("eventImage"), createEventGalleryItem);

// Get all event gallery items
router.get('/', getAllEventGalleryItems);

// Get event gallery item by ID
router.get('/:eventGalleryItemId', getEventGalleryItemById);

// Update event gallery item by ID
router.put('/:eventGalleryItemId', updateEventGalleryItemById);

// Delete event gallery item by ID
router.delete('/:eventGalleryItemId', deleteEventGalleryItemById);

export default router;