require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Set up the email transporter using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any service, such as Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL_USER, // Email from .env file
    pass: process.env.EMAIL_PASS, // Password or app password from .env file
  },
});

const sendEmail = (orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "rasmoe01@iba.dk",
    subject: `New Order - ${orderDetails.product}`,
    text: `
    A new order has been submitted:

    Product: ${orderDetails.product}
    Sub-product: ${orderDetails.subproduct}
    Customization: ${orderDetails.customization}

    Full name: ${orderDetails.fullname}
    Address: ${orderDetails.address}
    Email: ${orderDetails.email}

    Order Time: ${orderDetails.timestamp}
  `,
  };

  return transporter.sendMail(mailOptions);
};

// Handle form submission and send email
app.post("/submit", (req, res) => {
  const formData = {
    product: req.body.product,
    subproduct: req.body.subproduct,
    customization: req.body.customization,
    fullname: req.body.fullname,
    address: req.body.address,
    email: req.body.email,
    timestamp: new Date().toISOString(),
  };

  const filePath = "submissions.json";

  // Check if the file exists
  fs.readFile(filePath, "utf8", (err, data) => {
    let submissions = [];

    if (!err && data) {
      try {
        // Parse existing data if the file contains valid JSON
        submissions = JSON.parse(data);
      } catch (parseError) {
        console.error("❌ Error parsing JSON:", parseError);
        submissions = [];
      }
    }

    // Append the new form data to the array
    submissions.push(formData);

    // Save the updated array back to the file
    fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
      if (err) {
        console.error("❌ Error saving submission:", err);
        res.status(500).send("Something went wrong. Try again later.");
      } else {
        console.log("✅ Submission saved:", formData);

        // Send the email to the factory
        sendEmail(formData)
          .then(() => {
            console.log("✅ Email sent to factory");
            res.send(`
              <h2>Thank you!</h2>
              <p>Your submission has been saved and sent to the factory.</p>
              <a href="/">Back to form</a>
            `);
          })
          .catch((err) => {
            console.error("❌ Error sending email:", err);
            res
              .status(500)
              .send("Something went wrong while sending the email.");
          });
      }
    });
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
