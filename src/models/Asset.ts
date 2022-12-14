import mongoose, { Schema, SchemaTypes, Types } from "mongoose";

const AssetSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: [true, "name is required"],
  },
  unit: {
    type: SchemaTypes.ObjectId,
    ref: "Unit",
    required: [true, "unit is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
    required: [true, "image is required"],
  },
  model: {
    type: String,
    required: [true, "model is required"],
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: [true, "owner is required"],
  },
  status: {
    type: String,
    enum: ["Running", "Alerting", "Stopped"],
    required: [true, "status is required"],
  },
  healthLevel: {
    type: String,
    required: [true, "status is required"],
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
    default: Date.now,
  },
});

export default mongoose.model("Asset", AssetSchema);
