
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Notice = require("./models/Notice");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Welcome page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Department Notice Board</title>
      </head>
      <body>
        <h1>Welcome to the Department Notice Board</h1>
        <a href="/faculty">View Faculty</a>
      </body>
    </html>
  `);
});

// Faculty page
app.get("/faculty", (req, res) => {
  const faculty = [
    "Dr. Priya",
    "Dr. Arun Kumar",
    "Dr. Divya",
    "Ms. Swetha",
    "Mr. Karthik"
  ];

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Department Faculty</title>
      </head>
      <body>
        <h1>Department Faculty</h1>
        <ul>
          ${faculty.map((name) => `<li>${name}</li>`).join("")}
        </ul>
        <a href="/">Back to Home</a>
      </body>
    </html>
  `);
});

// GET: Retrieve all notices
app.get("/api/notices", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Error retrieving notices:", error);
    res.status(500).json({
      message: "Failed to fetch notices"
    });
  }
});

// POST: Add a new notice
app.post("/api/notices", async (req, res) => {
  try {
    const { title, message } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        message: "Title and message cannot be empty"
      });
    }

    const notice = await Notice.create({
      title: title.trim(),
      message: message.trim()
    });

    res.status(201).json({
      message: "Notice added successfully",
      notice
    });
  } catch (error) {
    console.error("Error adding notice:", error);
    res.status(500).json({
      message: "Failed to add notice"
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
