import mongoose, { Schema, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
