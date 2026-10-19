// import express from "express";
// import cors from "cors";
// import "dotenv/config";

// import connectDB from "./configs/mongodb.js";
// import clerkWebHooks from "./controllers/webhooks.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Edemy backend is running",
//   });
// });

// app.post("/clerk", express.json(), clerkWebHooks);

// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error.message);
//     process.exitCode = 1;
//   }
// };

// startServer();

import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./configs/mongodb.js";
import clerkWebHooks from "./controllers/webhooks.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Health check — does not require MongoDB
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Edemy backend is running",
  });
});

// Connect to MongoDB before processing webhook requests
app.post(
  "/clerk",
  express.json(),
  async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);

      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  },
  clerkWebHooks,
);

// Export the Express app for Vercel
export default app;

// Start a local HTTP server only outside Vercel
if (!process.env.VERCEL) {
  const startServer = async () => {
    try {
      await connectDB();

      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error.message);
      process.exitCode = 1;
    }
  };

  startServer();
}
