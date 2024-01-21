import Partners from '../models/partners.js';
import cloudinary from "../../../utils/Pic/cloudinary.js";
import { errorResMsg, successResMsg } from '../../../utils/lib/response.js';

// Create a new partner
const createPartner = async (req, res) => {
  try {
    const { companyName, companyType, aboutCompany } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new partner instance
    const partner = new Partners({
      companyName,
      companyType,
      aboutCompany,
      companyLogo: result.secure_url,
    });

    await partner.save();

    return successResMsg(res, 201, {
      message: 'Partner created successfully',
      partner,
    });
  } catch (error) {
    console.error('Error creating partner:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Get all partners
const getAllPartners = async (req, res) => {
  try {
    const partners = await Partners.find();

    return successResMsg(res, 200, { partners });
  } catch (error) {
    console.error('Error fetching all partners:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Get partner by ID
const getPartnerById = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const partner = await Partners.findById(partnerId);

    if (!partner) {
      return errorResMsg(res, 404, 'Partner not found');
    }

    return successResMsg(res, 200, { partner });
  } catch (error) {
    console.error('Error fetching partner by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Update partner by ID
const updatePartnerById = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const { companyName, companyType, aboutCompany} = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const updatedPartner = await Partners.findByIdAndUpdate(
      partnerId,
      { companyName, companyType, aboutCompany, companyLogo: result.secure_url },
      { new: true } // Return the updated partner
    );

    if (!updatedPartner) {
      return errorResMsg(res, 404, 'Partner not found');
    }

    return successResMsg(res, 200, {
      message: 'Partner updated successfully',
      partner: updatedPartner,
    });
  } catch (error) {
    console.error('Error updating partner by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

// Delete partner by ID
const deletePartnerById = async (req, res) => {
  try {
    const partnerId = req.params.partnerId;
    const deletedPartner = await Partners.findByIdAndRemove(partnerId);

    if (!deletedPartner) {
      return errorResMsg(res, 404, 'Partner not found');
    }

    return successResMsg(res, 200, 'Partner deleted successfully');
  } catch (error) {
    console.error('Error deleting partner by ID:', error);
    return errorResMsg(res, 500, error.message || 'Internal Server Error');
  }
};

export {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartnerById,
  deletePartnerById,
};