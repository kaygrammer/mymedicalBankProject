import mongoose from 'mongoose';

const eventGallerySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  eventImage: {
    type: String,
  },
});

const EventGallery = mongoose.model('EventGallery', eventGallerySchema);

export default EventGallery;