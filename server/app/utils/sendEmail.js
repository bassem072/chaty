import nodemailer from "nodemailer";

export const sendEmail = async (email, verificationLink) => {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Chaty By Bassem Elsayed",
    to: email,
    subject: "Email Verification",
    text: `Please verify your email address by clicking the following link: ${verificationLink}`,
  };

  await transport.sendMail(mailOptions);
};
