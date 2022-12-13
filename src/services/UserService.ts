import { Request, Response } from "express";
import User from "../models/User";
import { user } from "../interfaces/user.interface";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import handleRequestError from "../utils/error";

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("company");
    res.status(200).send({ users });
  } catch (error) {
    handleRequestError(error, res, "find", "users");
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const user = await User.findOne({ _id: id }).populate("company");
    res.status(200).send({ user });
  } catch (error) {
    handleRequestError(error, res, "find", "user");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(422).send({ message: "Body request empty." });
      return;
    }

    const newUser: user = {
      name: req.body.name,
      familyName: req.body.familyName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      created_at: req.body.created_at,
      lastLogin: req.body.lastLogin,
      company: req.body.companyId,
      type: req.body.type,
    };

    await User.create(newUser);
    res.status(201).send({ message: "User created.", newUser });
  } catch (error) {
    handleRequestError(error, res, "create", "a new user");
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const userInfo: user = {
      name: req.body.name,
      familyName: req.body.familyName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      created_at: req.body.created_at,
      lastLogin: req.body.lastLogin,
      company: req.body.companyId,
      type: req.body.type,
    };

    const updatedUser = await User.updateOne({ _id: id }, userInfo);
    checkEntityNotFoundOrNotModified(updatedUser, res);
    res.status(200).send({ message: "User updated.", userInfo });
  } catch (error) {
    handleRequestError(error, res, "edit", "user");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let requesterId = req.body.requesterId;
    checkUserRequester(id, requesterId);
    await User.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "User deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "user");
  }
};

function checkUserRequester(id: String, requesterId: String) {
  if (id === requesterId) {
    throw Error("The user can't delete itself.");
  }
}
