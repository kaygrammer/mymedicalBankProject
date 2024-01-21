import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventPic: {
    type: String,
  },
  eventInfo: {
    type: String
  },
  totalAttendance: {
    type: String
  },
  Date: {
    type: String
  },
  location: {
    type: String
  },
  summary: {
    type: String
  },
  eventHighlight: {
    type: String
  },
  eventVideoUrl: {
    type: String
  },
  speakers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speakers",
    },
  ],
  eventGallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventGallery",
    },
  ],
  partners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Partners",
    },
  ],

//   guest: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Guest",
//     required: true,
//   },
});

const Events = mongoose.model("Events", eventSchema);

export default Events;