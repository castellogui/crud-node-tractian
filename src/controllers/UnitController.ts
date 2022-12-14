import { Request, Response } from "express";
import handleRequestError from "../utils/error";
import UnitService from "../services/UnitService";
import { unit, updatedUnit } from "../interfaces/unit.interface";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import CompanyService from "../services/CompanyService";
const bcrypt = require("bcrypt");

export const findAllUnits = async (req: Request, res: Response) => {
  try {
    let units = await UnitService.findAllUnits();
    res.status(200).send({ units });
  } catch (error) {
    handleRequestError(error, res, "find", "units");
  }
};

export const findUnit = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let unit = await UnitService.findUnit(id);
    res.status(200).send({ unit });
  } catch (error) {
    handleRequestError(error, res, "find", "unit");
  }
};

export const createUnit = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(422).send({ message: "Body request empty." });
      return;
    }

    const newUnitInfo: unit = {
      name: req.body.name,
      zipCode: req.body.zipCode,
      created_at: req.body.created_at,
      assets: req.body.assets,
      company: req.body.companyId,
    };

    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(newUnitInfo.company));
    let newUnit = await UnitService.createUnit(newUnitInfo);
    await CompanyService.addUnitInCompany(newUnitInfo.company, newUnit._id);
    res.status(201).send({ message: "Unit created.", newUnit });
  } catch (error) {
    handleRequestError(error, res, "create", "a new unit");
  }
};

export const editUnit = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const unitInfo: updatedUnit = {
      name: req.body.name,
      zipCode: req.body.zipCode,
      created_at: req.body.created_at,
      assets: req.body.assets,
      company: req.body.companyId,
    };

    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(unitInfo.company));
    //TODO check entity in assets
    let updatedUnit = await UnitService.editUnit(id, unitInfo);
    checkEntityNotFoundOrNotModified(updatedUnit);
    res.status(200).send({ message: "Unit updated.", updatedUnit });
  } catch (error) {
    handleRequestError(error, res, "edit", "unit");
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let companyId = req.body.companyId;
    await UnitService.deleteUnit(id);
    checkEntityNotFoundOrNotModified(await CompanyService.findCompany(companyId));
    await CompanyService.removeUnitFromCompany(id, companyId);
    res.status(200).send({ message: "Unit deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "unit");
  }
};
