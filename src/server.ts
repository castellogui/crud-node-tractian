import mongoose, { mongo } from "mongoose";
import app from "../src/app";
import env from "dotenv";
env.config({ path: ".env" });

mongoose
  .connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log("Connected with MongoDB");
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });
