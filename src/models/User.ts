import mongoose, { Schema, SchemaTypes } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    required: [true, "name is required"],
  },
  familyName: {
    type: String,
    required: [true, "familyName is required"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  avatar: {
    type: String,
  },
  created_at: {
    type: Date,
    required: [true, "created_at is required"],
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    required: [true, "lastLogin is required"],
  },
  company: {
    type: mongoose.Types.ObjectId,
    ref: "Company",
    required: [true, "company is required"],
  },
  type: {
    type: [String],
    enum: ["ROLE_ADMIN", "ROLE_USER"],
    required: [true, "type is required"],
  },
});

export default mongoose.model("User", UserSchema);
