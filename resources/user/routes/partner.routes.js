import express from 'express';
import {
  createPartner,
  getAllPartners,
  getPartnerById,
  updatePartnerById,
  deletePartnerById,
} from '../controllers/partners.js';
import {upload} from "../../../utils/Pic/multer.js"; 

const router = express.Router();

// Create a new partner
router.post('/', upload.single("partnerLogo"), createPartner);

// Get all partners
router.get('/', getAllPartners);

// Get partner by ID
router.get('/:partnerId', getPartnerById);

// Update partner by ID
router.put('/:partnerId', upload.single("partnerLogo"), updatePartnerById);

// Delete partner by ID
router.delete('/:partnerId', deletePartnerById);

export default router;