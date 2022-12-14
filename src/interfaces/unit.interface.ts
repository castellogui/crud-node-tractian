import mongoose, { Schema } from "mongoose";

export interface unit {
  name: String;
  zipCode: Number;
  created_at: Date;
  assets: [Schema.Types.ObjectId];
  company: mongoose.Types.ObjectId;
}
