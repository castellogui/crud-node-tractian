import mongoose from "mongoose";

export interface user {
  name: String;
  familyName: String;
  username: String;
  email: String;
  password: String;
  avatar: String;
  created_at: Date;
  lastLogin: Date;
  company: mongoose.Types.ObjectId;
  type: String;
  token?: String;
}

export interface updatedUser {
  name?: String;
  familyName?: String;
  username?: String;
  email?: String;
  password?: String;
  avatar?: String;
  created_at?: Date;
  lastLogin?: Date;
  company?: String;
  type?: String;
}
