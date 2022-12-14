import mongoose, { Schema, SchemaTypes, Types } from "mongoose";

const UnitSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: [true, "name is required"],
  },
  zipCode: {
    type: SchemaTypes.Number,
    required: [true, "zipCode is required"],
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
    default: Date.now,
  },
  assets: {
    type: [Types.ObjectId],
    required: [true, "assets is required"],
    default: [],
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
    required: [true, "company is required"],
  },
});

export default mongoose.model("Unit", UnitSchema);
