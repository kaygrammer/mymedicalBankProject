import mongoose from 'mongoose';

const partnershipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  organisation: {
    type: String,
    required: true,
  },
});

const partnershipData = mongoose.model('partnershipData', partnershipSchema);

export default partnershipData;