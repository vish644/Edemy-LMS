import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import clerkWebHooks from "./controllers/webhooks.js";

// Initialize Express
const app = express();
const PORT = process.env.PORT || "5000";

// Connect to DB
await connectDB();

// Middleware
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("API working!");
});
app.post("/clerk", express.json(), clerkWebHooks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
