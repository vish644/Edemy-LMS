// import mongoose from "mongoose";

// // Connect to the mongodb database
// const connectDB = () => {
//   mongoose.connection.on("connected", async () => {
//     console.log("Database Connected!");

//     await mongoose.connect(
//       `${process.env.MONGODB_URI}/Learning Management System (LMS New)`,
//     );
//   });
// };

// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("Database already connected!");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is missing from environment variables");
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "Learning Management System (LMS New)",
    serverSelectionTimeoutMS: 10000,
  });

  console.log("Database Connected!");
};

export default connectDB;
