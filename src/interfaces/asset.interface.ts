import mongoose, { Types } from "mongoose";

export interface asset {
  name: String;
  unit: Types.ObjectId;
  description: String;
  avatar: String;
  model: String;
  owner: Types.ObjectId;
  status: String;
  healthLevel: Number;
  created_at: Date;
}

export interface updatedAsset {
  name?: String;
  unit: String;
  description?: String;
  avatar?: String;
  model?: String;
  owner?: Types.ObjectId;
  status?: String;
  healthLevel?: Number;
  created_at?: Date;
}
