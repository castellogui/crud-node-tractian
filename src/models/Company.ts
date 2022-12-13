import mongoose, { Schema, SchemaTypes } from "mongoose";

const CompanySchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  units: {
    type: SchemaTypes.Array,
    required: true,
  },
  users: {
    type: SchemaTypes.Array,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Company", CompanySchema);
