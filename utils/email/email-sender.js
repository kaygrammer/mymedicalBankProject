import nodemailer from "nodemailer";
//import serverDown from "../templates/server_down_template.js";
//import verificationTemplate from "../templates/verification-template.js";
import welcomeTemplate from "../templates/welcome-template.js";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ACC,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(options) {
    try {
      const info = await this.transporter.sendMail(options);
      console.log(
        `${new Date().toLocaleString()} - Email sent successfully: ${
          info.response
        }`
      );
    } catch (error) {
      console.log("Email error:", error.message);
      throw new Error(
        "Couldn't send Email, please check you email address and try again."
      );
    }
  }

  async sendWelcomeEmail(firstName, email) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to ODS",
      html: welcomeTemplate(firstName),
    };
    await this.sendEmail(mailOptions);
  }

  async sendPasswordResetOtp(email, otp) {
    const mailOptions = {
      from: process.env.EMAIL_ACC,
      to: email,
      subject: "Forget Password Pin",
      html: `Your password reset pin is ${otp}`,
    };

    await this.sendEmail(mailOptions);
  }

  async sendPasswordResetConfirmation(email) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Confirmation",
      html: "Your password has been successfully reset.",
    };

    await this.sendEmail(mailOptions);
  }

  async sendEmailVerification(email, verification) {
    const mailOptions = {
      from: process.env.EMAIL_ACC,
      to: email,
      subject: "Email Verification",
      html: `use the code below to verify your email: ${verification}`,
    };

    await this.sendEmail(mailOptions);
  }

  async sendResetPasswordOTP(email, resetOTP) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password OTP",
      html: `Your OTP for password reset is: ${resetOTP}`,
    };

    await this.sendEmail(mailOptions);
  }

  async sendSpeakerEmail(first_name, email) {
    const mailOptions = {
      from: `"Daniel from Ogun Digital Summit" <${process.env.EMAIL_ACC}>`,
      to: email,
      subject: "Ogun Digital Summit 2023: Speaker Opportunity",
      text: "Thank you for your submission!",
      html: `
        <p>Dear ${first_name},</p>
        <p>Thank you for your interest in joining us as a speaker for Ogun Digital Summit 2023.</p>
      <p>Best regards,</p>
      <p>Daniel Owolabi,</p>
      <p>Team Lead, Ogun Digital Summit</p>
      <p>daniel@ogundigitalsummit.com</p>
      <p>+234 808 715 2464</p>
      `,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(
        `${new Date().toLocaleString()} - Partnership Email sent successfully: ${
          info.response
        }`
      );
    } catch (error) {
      console.log("Partnership Email error:", error.message);
      throw new Error(
        "Couldn't send Partnership Email, please check your email address and try again."
      );
    }
  }
}

export default EmailService;
