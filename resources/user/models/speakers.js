import mongoose from 'mongoose';

const speakerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  careerType: {
    type: String,
  },
  photo: {
    type: String,
  },
  juridiction: {
    type: String,
  },
  companyName: {
    type: String,
  },
  aboutSpeaker: {
    type: String,
  },
});

const Speakers = mongoose.model('Speakers', speakerSchema);

export default Speakers;