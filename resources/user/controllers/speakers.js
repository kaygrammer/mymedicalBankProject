import Speakers from '../models/speakers.js';
import cloudinary from "../../../utils/Pic/cloudinary.js";
import { errorResMsg, successResMsg } from '../../../utils/lib/response.js';

// Create a new speaker
const createSpeaker = async (req, res) => {
  try {
    const { name, careerType, jurisdiction, companyName, aboutSpeaker } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const speaker = new Speakers({
      name,
      careerType,
      photo: result.secure_url,
      jurisdiction,
      companyName,
      aboutSpeaker
    });

    await speaker.save();

    return successResMsg(res, 201, {
      message: 'Speaker created successfully',
      speakerName: speaker.name,
    });
  } catch (error) {
    console.error('Error creating speaker:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speakers.find();

    return successResMsg(res, 200, { speakers });
  } catch (error) {
    console.error('Error fetching all speakers:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Get speaker by ID
const getSpeakerById = async (req, res) => {
  try {
    const speakerId = req.params.speakerId;
    const speaker = await Speakers.findById(speakerId);

    if (!speaker) {
      return errorResMsg(res, 404, 'Speaker not found');
    }

    return successResMsg(res, 200, { speaker });
  } catch (error) {
    console.error('Error fetching speaker by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Update speaker by ID
const updateSpeakerById = async (req, res) => {
  try {
    const speakerId = req.params.speakerId;
    const { name, careerType, jurisdiction, companyName, aboutSpeaker } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const updatedSpeaker = await Speakers.findByIdAndUpdate(
      speakerId,
      { name, jurisdiction, careerType, companyName, aboutSpeaker, photo: result.secure_url,  },
      { new: true } // Return the updated speaker
    );

    if (!updatedSpeaker) {
      return errorResMsg(res, 404, 'Speaker not found');
    }

    return successResMsg(res, 200, {
      message: 'Speaker updated successfully',
      speaker: updatedSpeaker,
    });
  } catch (error) {
    console.error('Error updating speaker by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Delete speaker by ID
const deleteSpeakerById = async (req, res) => {
  try {
    const speakerId = req.params.speakerId;
    const deletedSpeaker = await Speakers.findByIdAndRemove(speakerId);

    if (!deletedSpeaker) {
      return errorResMsg(res, 404, 'Speaker not found');
    }

    return successResMsg(res, 200, 'Speaker deleted successfully');
  } catch (error) {
    console.error('Error deleting speaker by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

export {
  createSpeaker,
  getAllSpeakers,
  getSpeakerById,
  updateSpeakerById,
  deleteSpeakerById,
};