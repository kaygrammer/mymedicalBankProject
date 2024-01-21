import { errorResMsg, successResMsg } from "../../../utils/lib/response.js";
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import partnershipData from '../models/odsPartnershipModel.js';

dotenv.config();

// Handle form submission
const submitForm = async(req, res) => {
  const { name, email, phone, organisation } = req.body;

  // Check if all fields are provided
  if (!name || !email || !organisation || !phone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Save form data in the database
  const formData = new partnershipData({
    name,
    email,
    phone,
    organisation,
  });
  await formData.save();

  // Create a Nodemailer transporter.
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ACC,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Get the file path to the PDF
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDirPath = path.dirname(currentFilePath);
  const filePath = path.join(currentDirPath, 'ODSProposal.pdf');

  // Define the email options
  const mailOptions = {
    from: `"Daniel from Ogun Digital Summit" <${process.env.EMAIL_ACC}>`,
    to: email,
    subject: 'Ogun Digital Summit 2023: Partnership Opportunity',
    text: 'Thank you for your submission!',
    html: `
      <p>Dear ${name},</p>
      <p>Thank you for your interest in joining us as a partner for Ogun Digital Summit 2023.</p>
      <p>Ogun Digital Summit started in 2020 with a focus on promoting youth empowerment, technology entrepreneurship, and social innovation.</p>
      <p>In 2020, we had 1,600 participants, 1,800 in 2021, and over 2,000 participants in the last edition of Ogun Digital Summit.</p>
      <p>We are looking forward to hosting 2,500 participants this year, and we have attached our proposal to this email for your perusal.</p>
      <p>If you have any further questions or flexibility on our packages, please feel free to reach out to our team.</p>
      <p>We look forward to partnering with you for this year's summit.</p>
      <p>Best regards,</p>
      <p>Daniel Owolabi,</p>
      <p>Team Lead, Ogun Digital Summit</p>
      <p>daniel@ogundigitalsummit.com</p>
      <p>+234 808 715 2464</p>
    `,
    attachments: [
      {
        filename: 'ODSProposal.pdf',
        path: filePath,
      },
    ],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred while sending the email:', error);
      res.status(500).json({ error: 'An error occurred while sending the email' });
    } else {
      console.log('Email sent:', info.response);

      // Send request body information to a particular email address
      const requestBodyEmail = process.env.EMAIL_ACC; // Replace with the particular email address
      const requestBodyOptions = {
        from: process.env.EMAIL_ACC,
        to: requestBodyEmail,
        subject: 'Ogun Digital Summit 2023: Partnership Details',
        text: `Name: ${name}\nEmail: ${email}\nOrganisation: ${organisation}\nphone: ${phone}`,
      };

      transporter.sendMail(requestBodyOptions, (error, info) => {
        if (error) {
          console.error('Error occurred while sending the request body email:', error);
        } else {
          console.log('Request body email sent:', info.response);
        }
      });

      return successResMsg(res, 200, {
        success: true,
        message: 'Email sent successfully',
      });
    }
  });
};

export default {
  submitForm,
};
