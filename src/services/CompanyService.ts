import { Types } from "mongoose";
import { company } from "../interfaces/company.interface";
import { unit, updatedUnit } from "../interfaces/unit.interface";
import { updatedUser } from "../interfaces/user.interface";
import Company from "../models/Company";
import UnitService from "./UnitService";
import UserService from "./UserService";

export default {
  findAllCompanies: async () => {
    const companies = await Company.find().populate("users").populate("units");
    return companies;
  },

  findCompany: async (id: String | Types.ObjectId | undefined) => {
    const company = await Company.findOne({ _id: id }).populate("users").populate("units");
    return company;
  },

  createCompany: async (newCompanyInfo: company) => {
    let newCompany = await Company.create(newCompanyInfo);
    return newCompany;
  },

  editCompany: async (id: String, companyEditableInfo: any) => {
    const updatedCompany = await Company.updateOne({ _id: id }, companyEditableInfo);
    return updatedCompany;
  },

  deleteCompany: async (id: String) => {
    await Company.findByIdAndDelete({ _id: id });
  },

  findCompanyByCompanyAndUser: async (companyId: String, userId: String) => {
    let company = await Company.findOne({ _id: companyId, users: [{ _id: userId }] });
    return company != null ? company : null;
  },

  addUserInCompany: async (companyId: String | Types.ObjectId, userId: String | Types.ObjectId) => {
    const updatedCompany = await Company.updateOne(
      { _id: companyId },
      {
        $push: {
          users: [{ _id: userId }],
        },
      }
    );
    return updatedCompany;
  },

  moveUserFromCompany: async (CurrentCompanyId: String, userId: String, newCompanyId: String) => {
    const updatedCompanyRemoved = await Company.updateOne(
      { _id: CurrentCompanyId },
      {
        $pullAll: {
          users: [{ _id: userId }],
        },
      }
    );

    const updatedCompanyAdded = await Company.updateOne(
      { name: newCompanyId },
      {
        $push: {
          users: [{ _id: userId }],
        },
      }
    );

    let updatedUserCompany: updatedUser = { company: newCompanyId };
    let updatedUser = UserService.editUser(userId, updatedUserCompany);
    return [updatedCompanyRemoved, updatedCompanyAdded, updatedUser];
  },

  removeUserFromCompany: async (userId: String, companyId: String) => {
    const updatedCompany = await Company.updateOne(
      { _id: companyId },
      {
        $pullAll: {
          users: [{ _id: userId }],
        },
      }
    );
  },

  findCompanyByCompanyAndUnit: async (companyId: String, unitId: String) => {
    let company = await Company.findOne({ _id: companyId, units: [{ _id: unitId }] });
    return company != null ? company : null;
  },

  addUnitInCompany: async (companyId: String | Types.ObjectId, unitId: String | Types.ObjectId) => {
    const updatedCompany = await Company.updateOne(
      { _id: companyId },
      {
        $push: {
          units: [{ _id: unitId }],
        },
      }
    );
    return updatedCompany;
  },

  moveUnitFromCompany: async (CurrentCompanyId: String, unitId: String, newCompanyId: String) => {
    const updatedCompanyRemoved = await Company.updateOne(
      { _id: CurrentCompanyId },
      {
        $pullAll: {
          units: [{ _id: unitId }],
        },
      }
    );

    const updatedCompanyAdded = await Company.updateOne(
      { _id: newCompanyId },
      {
        $push: {
          units: [{ _id: unitId }],
        },
      }
    );

    let updatedUnitCompany: updatedUnit = { company: newCompanyId };
    let updatedUnit = UnitService.editUnit(unitId, updatedUnitCompany);
    return [updatedCompanyRemoved, updatedCompanyAdded, updatedUnit];
  },

  removeUnitFromCompany: async (unitId: String, companyId: String) => {
    const updatedCompany = await Company.updateOne(
      {
        _id: companyId,
      },
      {
        $pullAll: {
          units: [{ _id: unitId }],
        },
      }
    );
  },
};
