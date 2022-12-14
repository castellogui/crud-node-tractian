import { Request, Response } from "express";
import { company } from "../interfaces/company.interface";
import CompanyService from "../services/CompanyService";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import handleRequestError from "../utils/error";

export const findAllCompanies = async (req: Request, res: Response) => {
  try {
    let companies = await CompanyService.findAllCompanies();
    res.status(200).send({ companies });
  } catch (error) {
    handleRequestError(error, res, "find", "companies");
  }
};

export const findCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let company = await CompanyService.findCompany(id);
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

    const newCompanyInfo: company = {
      name: req.body.name,
      units: req.body.units,
      users: req.body.users,
      created_at: req.body.created_at,
    };

    let newCompany = await CompanyService.createCompany(newCompanyInfo);
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

    const updatedCompany = await CompanyService.editCompany(id, companyEditableInfo);
    checkEntityNotFoundOrNotModified(updatedCompany);
    res.status(200).send({ message: "Company updated", updatedCompany });
  } catch (error) {
    handleRequestError(error, res, "edit", "company");
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    await checkUsersBeforeDelete(id);
    await CompanyService.deleteCompany(id);
    res.status(200).send({ message: "Company deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "company");
  }
};

export const moveUserFromCompany = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let userId = req.body.userId;
    let newUserInfo = req.body.userInfo;
    await checkUserInCompanyBeforeAdd(newUserInfo.company, userId);
    let [updatedCompanyRemoved, updatedCompanyAdded, updatedUser] =
      await CompanyService.moveUserFromCompany(id, userId, newUserInfo);
    checkEntityNotFoundOrNotModified(await updatedUser);
    res.status(200).send({
      message: "User transferred from company.",
      updatedCompanyRemoved,
      updatedCompanyAdded,
    });
  } catch (error) {
    handleRequestError(error, res, "delete", "user from company");
  }
};

async function checkUsersBeforeDelete(id: String) {
  let resultQuery = await CompanyService.findCompany(id);
  let foundUsers = resultQuery?.users.length! > 0;
  if (foundUsers) {
    throw Error("The company can't be deleted because there is users registered yet.");
  }
}

async function checkUserInCompanyBeforeAdd(newCompanyId: String, userId: String) {
  let userFounded = [];
  let response = await CompanyService.findCompanyByCompanyAndUser(newCompanyId, userId);
  response != null ? userFounded.push(response) : null;
  const isUserInCompany = userFounded.length;
  if (isUserInCompany > 0) {
    throw Error("User is already added in company.");
  }
}
