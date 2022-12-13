import { Request, Response } from "express";
import { company } from "../interfaces/company.interface";
import Company from "../models/Company";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import handleRequestError from "../utils/error";

export const findAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find().populate("users");
    res.status(200).send({ companies });
  } catch (error) {
    handleRequestError(error, res, "find", "companies");
  }
};

export const findCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const company = await Company.findOne({ _id: id }).populate("users");
    res.status(200).send({ company });
  } catch (error) {
    handleRequestError(error, res, "find", "company");
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(422).send({ message: "Body request empty." });
      return;
    }

    const newCompany: company = {
      name: req.body.name,
      units: req.body.units,
      users: req.body.users,
      created_at: req.body.created_at,
    };

    await Company.create(newCompany);
    res.status(201).send({ message: "Company created", newCompany });
  } catch (error) {
    handleRequestError(error, res, "create", "company");
  }
};

export const editCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const companyEditableInfo = {
      name: req.body.name,
    };

    const updatedCompany = await Company.updateOne({ _id: id }, companyEditableInfo);
    checkEntityNotFoundOrNotModified(updatedCompany, res);
    res.status(200).send({ message: "Company updated", updatedCompany });
  } catch (error) {
    handleRequestError(error, res, "edit", "company");
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    await checkUsersBeforeDelete(id);
    await Company.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Company deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "company");
  }
};

async function checkUsersBeforeDelete(id: String) {
  let resultQuery = await Company.findOne({ _id: id });
  let foundUsers = resultQuery?.users.length! > 0;
  if (foundUsers) {
    throw Error("The company can't be deleted because there is users registered yet.");
  }
}
