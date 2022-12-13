import mongoose, { Schema, SchemaTypes, Types } from "mongoose";

const CompanySchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  units: {
    type: SchemaTypes.Array,
    required: true,
    default: [],
  },
  users: {
    type: [Types.ObjectId],
    ref: "User",
    required: true,
    default: [],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export default mongoose.model("Company", CompanySchema);
