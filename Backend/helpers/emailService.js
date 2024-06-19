require('dotenv').config(); // This line loads environment variables from .env
const nodemailer = require('nodemailer');


// Setup email transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // Note: For Gmail, secure is often false unless you're using port 465 (true for 465)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends an email using predefined transporter.
 * @param {string} to Recipient's email address
 * @param {string} subject Email subject
 * @param {string} text Email text body
 */
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM, // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = { sendEmail };
