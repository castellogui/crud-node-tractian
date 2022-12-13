import { Request, Response } from "express";
import User from "../models/User";
import { user } from "../interfaces/user.interface";
import { handleEntityNotFoundOrNotModified } from "../utils/entity";

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("company");
    res.status(200).send({ users });
  } catch (error) {
    handleError(error, res);
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const user = await User.findOne({ _id: id }).populate("company");
    res.status(200).send({ user });
  } catch (error) {
    handleError(error, res);
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
    handleError(error, res);
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
      type: req.body.companyId,
    };

    const updatedUser = await User.updateOne({ _id: id }, userInfo);
    if (handleEntityNotFoundOrNotModified(updatedUser, res)) return;
    res.status(200).send({ message: "User updated.", updatedUser });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to edit an user.",
      errorDetail: error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "User deleted." });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to delete an user.",
      errorDetail: error,
    });
  }
};

function handleError(error: Error | unknown, res: Response) {
  if (error instanceof Error) {
    res.status(500).send({
      message: "Some error has occurred while trying to create a new user.",
      errorDetail: error.message,
    });
    return;
  } else {
    res.status(500).send({
      message: "Some unknown error has occurred while trying to create a new user.",
      errorDetail: error,
    });
    return;
  }
}
