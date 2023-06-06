import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected!");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.use("/api/posts", postRoutes);
