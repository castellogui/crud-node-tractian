import mongoose from "mongoose";

export interface company {
  name: String;
  units: Array<mongoose.Types.ObjectId>;
  users: Array<mongoose.Types.ObjectId>;
  created_at: Date;
}
