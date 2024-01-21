import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  companyType: {
    type: String,
  },
  aboutCompany: {
    type: String,
  },
  companyLogo: {
    type: String,
  },
});

const Partners = mongoose.model("Partners", partnerSchema);

export default Partners;
