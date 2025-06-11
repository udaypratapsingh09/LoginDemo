const nodemailer = require("nodemailer");

async function sendTestEmail({ username, link }) {
  // Create a test account
  const testAccount = await nodemailer.createTestAccount();

  // Create a transporter using Ethereal SMTP
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure, // true for port 465, false for others
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Send the email
  const info = await transporter.sendMail({
    from: '"Dev App" <dev@example.com>',
    to: "user@example.com",
    subject: "Hello from Ethereal",
    text: "This is a test email sent using Ethereal!",
    html: `<h3>Hello ${username},</h3> <button style="background-color: #4CAF50; border: none; color: white; text-align: center; text-decoration: none; display: inline-block; font-size: 16px"><a href="${link}" style="text-decoration: none">Verify Email</a> </button>`,
  });

  console.log("Message sent: %s", info.messageId);
  return nodemailer.getTestMessageUrl(info);
}

module.exports = sendTestEmail;
