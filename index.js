const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();

// Replit-এর জন্য পোর্ট সেট করা
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// API রুট: মেসেজ সংরক্ষণের জন্য
app.post("/messages", (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).send("Name and message are required.");
  }

  const log = `Name: ${name}, Message: ${message}\n`;

  fs.appendFile("messages.txt", log, (err) => {
    if (err) {
      console.error("Error saving the message:", err);
      return res.status(500).send("Failed to save the message.");
    }
    res.status(200).send("Message saved successfully.");
  });
});

// সার্ভার শুরু
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
