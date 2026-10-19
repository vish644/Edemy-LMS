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

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/Learning Management System (LMS)`,
    );

    console.log("Database Connected!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
