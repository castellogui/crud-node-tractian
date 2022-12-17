import { Request, Response } from "express";
import { company } from "../interfaces/company.interface";
import CompanyService from "../services/CompanyService";
import UnitService from "../services/UnitService";
import UserService from "../services/UserService";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import handleRequestError from "../utils/error";

export const findAllCompanies = async (req: Request, res: Response) => {
  try {
    let companies = await CompanyService.findAllCompanies();
    res.status(200).send(companies);
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
    let currentCompanyId = req.params.id;
    let userId = req.body.userId;
    let newCompanyId = req.body.newCompanyId;
    await checkUserInCompanyBeforeAdd(newCompanyId, userId);
    checkEntityNotFoundOrNotModified(await UserService.findUser(userId));
    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(currentCompanyId));
    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(newCompanyId));
    let [updatedCompanyRemoved, updatedCompanyAdded, updatedUser] =
      await CompanyService.moveUserFromCompany(currentCompanyId, userId, newCompanyId);
    res.status(200).send({
      message: "User transferred from company.",
      updatedCompanyRemoved,
      updatedCompanyAdded,
    });
  } catch (error) {
    handleRequestError(error, res, "move", "user from company");
  }
};

export const moveUnitFromCompany = async (req: Request, res: Response) => {
  try {
    let currentCompanyId = req.params.id;
    let unitId = req.body.unitId;
    let newCompanyId = req.body.newCompanyId;
    checkEntityNotFoundOrNotModified(await UnitService.findUnit(unitId), unitId);
    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(currentCompanyId));
    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(newCompanyId));
    await checkUnitInCompanyBeforeAdd(newCompanyId, unitId);
    let [updatedCompanyRemoved, updatedCompanyAdded, updatedUnit] =
      await CompanyService.moveUnitFromCompany(currentCompanyId, unitId, newCompanyId);
    res.status(200).send({
      message: "Unit transferred from company.",
      updatedCompanyRemoved,
      updatedCompanyAdded,
    });
  } catch (error) {
    handleRequestError(error, res, "delete", "unit from company");
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
  let response = await UserService.findUser(userId);
  let checkCompanyId = response?.company == newCompanyId;
  if (checkCompanyId) {
    throw Error("User is already added in company.");
  }
}

async function checkUnitInCompanyBeforeAdd(newCompanyId: String, unitId: String) {
  let response = await UnitService.findUnit(unitId);
  let checkCompanyId = response?.company == newCompanyId;
  if (checkCompanyId) {
    throw Error("Unit is already added in company.");
  }
}
