import { Request, Response } from "express";
import { company } from "../interfaces/company.interface";
import Company from "../models/Company";
import { handleEntityNotFoundOrNotModified } from "../utils/entity";

export const findAllCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Company.find();
    res.status(200).send({ companies });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to find all companies.",
      errorDetail: error,
    });
  }
};

export const findCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const company = await Company.findOne({ _id: id });
    res.status(200).send({ company });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to create a new company.",
      errorDetail: error,
    });
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

    if (checkIrregularitiesInCompanyObject(res, newCompany)) return;
    await Company.create(newCompany);
    res.status(201).send({ message: "Company created", newCompany });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Some error has occurred while trying to create a new company.",
      errorDetail: error,
    });
  }
};

export const editCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const companyInfo: company = {
      name: req.body.name,
      units: req.body.units,
      users: req.body.users,
      created_at: req.body.created_at,
    };

    if (checkIrregularitiesInCompanyObject(res, companyInfo)) return;
    const updatedCompany = await Company.updateOne({ _id: id }, companyInfo);
    if (handleEntityNotFoundOrNotModified(updatedCompany, res)) return;
    res.status(200).send({ message: "Company updated", updatedCompany });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to edit an company.",
      errorDetail: error,
    });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    await Company.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: "Company deleted." });
  } catch (error) {
    res.status(500).send({
      message: "Some error has occurred while trying to delete a company.",
      errorDetail: error,
    });
  }
};

function checkIrregularitiesInCompanyObject(res: Response, newCompany: company) {
  for (const atr in newCompany) {
    if (newCompany[atr as keyof typeof newCompany] == "") {
      res.status(422).send({ message: `Field '${atr}' must not be empty.` });
      return true;
    }

    if (typeof newCompany[atr as keyof typeof newCompany] != "string" && !(atr == "created_at")) {
      res.status(422).send({ message: `Field '${atr}' must be a string.` });
      return true;
    }
  }

  if (typeof newCompany.created_at != "number") {
    res.status(422).send({ message: "Field created_at must be a Date type." });
    return true;
  }
}
