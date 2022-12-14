import mongoose, { Schema, SchemaTypes, Types } from "mongoose";

const CompanySchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: [true, "name is required"],
  },
  units: {
    type: [Types.ObjectId],
    ref: "Unit",
    required: [true, "units is required"],
    default: [],
  },
  users: {
    type: [Types.ObjectId],
    ref: "User",
    required: [true, "users is required"],
    default: [],
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
    default: Date.now(),
  },
});

export default mongoose.model("Company", CompanySchema);
