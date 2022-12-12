import { Request, Response } from "express";
import User from "../models/User";
import { user } from "../interfaces/user.interface";

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    res.status(500).send({ error });
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
      companyId: req.body.companyId,
    };

    for (const atr in newUser) {
      if (newUser[atr as keyof typeof newUser] == "" && !(atr == "avatar" || atr == "lastLogin")) {
        res.status(422).send({ message: `Field '${atr}' must not be empty.` });
        return;
      }

      if (
        typeof newUser[atr as keyof typeof newUser] != "string" &&
        !(atr == "created_at" || atr == "lastLogin")
      ) {
        res.status(422).send({ message: `Field '${atr}' must be a string.` });
        return;
      }
    }

    if (typeof newUser.created_at != "number" || typeof newUser.lastLogin != "number") {
      res.status(422).send({ message: "Field created_at or lastLogin must be a Date type." });
      return;
    }

    await User.create(newUser);
    res.status(201).send({ message: "User created", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error has occurred while trying to create a new user.",
      errorDetail: error,
    });
  }
};
