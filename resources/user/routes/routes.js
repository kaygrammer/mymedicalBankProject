import express from 'express';
import formController from '../controllers/formController.js';
import  { signUp, masterclass_signup, exhibitor_signup, uploadFile }  from '../controllers/userController.js';
import { validate_signup, validate_masterclass, validate_exhibitors } from '../../helper/signup.validation.js';
import {fileupload} from "../../../utils/Pic/multer.js";
import multer from 'multer';
const router = express.Router();


// Endpoint to handle form submission
router.post('/submit-form', formController.submitForm);

// Endpoint to handle speaker signup
router.post('/signup',  validate_signup , signUp );

router.post('/upload', fileupload.single("files"), uploadFile );

// router.post('/upload', type, upload );
// Endpoint to handle masterclass trainer signup
router.post('/masterclass', validate_masterclass, masterclass_signup);

// Endpoint to handle exhibitors signup
router.post('/exhibitor',validate_exhibitors, exhibitor_signup);

export default router;