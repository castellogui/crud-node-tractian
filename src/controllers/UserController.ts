import { Request, Response } from "express";
import handleRequestError from "../utils/error";
import UserService from "../services/UserService";
import { updatedUser, user } from "../interfaces/user.interface";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import CompanyService from "../services/CompanyService";
const bcrypt = require("bcrypt");

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    let users = await UserService.findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    handleRequestError(error, res, "find", "users");
  }
};

export const findUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let user = await UserService.findUser(id);
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

    const newUserInfo: user = {
      name: req.body.name,
      familyName: req.body.familyName,
      username: req.body.username,
      email: req.body.email,
      password: await encryptPassword(req.body.password),
      avatar: req.body.avatar,
      created_at: req.body.created_at,
      lastLogin: req.body.lastLogin,
      company: req.body.companyId,
      type: req.body.type,
    };

    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(newUserInfo.company));
    let newUser = await UserService.createUser(newUserInfo);
    await CompanyService.addUserInCompany(newUserInfo.company, newUser._id);
    res.status(201).send({ message: "User created.", newUser });
  } catch (error) {
    handleRequestError(error, res, "create", "a new user");
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const userInfo: updatedUser = {
      name: req.body.name,
      familyName: req.body.familyName,
      username: req.body.username,
      email: req.body.email,
      password: await encryptPassword(req.body.password),
      avatar: req.body.avatar,
      created_at: req.body.created_at,
      lastLogin: req.body.lastLogin,
      company: req.body.companyId,
      type: req.body.type,
    };

    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(userInfo.company));
    let updatedUser = await UserService.editUser(id, userInfo);
    checkEntityNotFoundOrNotModified(updatedUser);
    res.status(200).send({ message: "User updated.", updatedUser });
  } catch (error) {
    handleRequestError(error, res, "edit", "user");
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let requesterId = req.body.requesterId;
    let companyId = req.body.companyId;
    await UserService.deleteUser(id, requesterId);
    await CompanyService.removeUserFromCompany(id, companyId);
    res.status(200).send({ message: "User deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "user");
  }
};

async function encryptPassword(password: String) {
  return await bcrypt.hash(password, 10);
}
