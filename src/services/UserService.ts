import { user } from "../interfaces/user.interface";
import User from "../models/User";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
export default {
  findAllUsers: async () => {
    const users = await User.find().populate("company");
    return users;
  },

  findUser: async (id: String) => {
    const user = await User.findOne({ _id: id }).populate("company");
    return user;
  },

  createUser: async (newUserInfo: user) => {
    let newUser = await User.create(newUserInfo);
    return newUser;
  },

  editUser: async (id: String, userInfo: user) => {
    const updatedUser = await User.updateOne({ _id: id }, userInfo);
    checkEntityNotFoundOrNotModified(updatedUser);
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
