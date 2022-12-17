import { Types } from "mongoose";
import { updatedUser, user } from "../interfaces/user.interface";
import User from "../models/User";
export default {
  findAllUsers: async () => {
    const users = await User.find().populate("company");
    return users;
  },

  findUser: async (id: String | Types.ObjectId | undefined) => {
    const user = await User.findOne({ _id: id });
    return user;
  },

  findUserByEmail: async (email: String) => {
    const user = await User.findOne({ email: email }).populate("company");
    return user;
  },

  createUser: async (newUserInfo: user) => {
    let newUser = await User.create(newUserInfo);
    return newUser;
  },

  editUser: async (id: String, userInfo: updatedUser) => {
    const updatedUser = await User.updateOne({ _id: id }, userInfo);
    return updatedUser;
  },

  deleteUser: async (id: String, requesterId: String) => {
    checkUserRequester(id, requesterId);
    let foundedUser = await User.findByIdAndDelete({ _id: id });
    await checkFoundedUserToDelete(foundedUser);
  },
};

function checkUserRequester(id: String, requesterId: String) {
  if (id === requesterId) {
    throw Error("The user can't delete itself.");
  }
}

async function checkFoundedUserToDelete(user: any) {
  if (user === null) {
    throw Error("Can't delete user because it was not founded.");
  }
}
