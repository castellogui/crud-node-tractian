import { Types } from "mongoose";
import { updatedAsset } from "../interfaces/asset.interface";
import { unit, updatedUnit } from "../interfaces/unit.interface";
import Unit from "../models/Unit";
import AssetService from "./AssetService";
export default {
  findAllUnits: async () => {
    const units = await Unit.find().populate("company");
    return units;
  },

  findUnit: async (id: String | Types.ObjectId) => {
    const unit = await Unit.findOne({ _id: id });
    return unit;
  },

  createUnit: async (newUnitInfo: unit) => {
    let newUnit = await Unit.create(newUnitInfo);
    return newUnit;
  },

  editUnit: async (id: String, unitInfo: updatedUnit) => {
    const updatedUnit = await Unit.updateOne({ _id: id }, unitInfo);
    return updatedUnit;
  },

  deleteUnit: async (id: String) => {
    let foundedUnit = await Unit.findByIdAndDelete({ _id: id });
    await checkFoundedUnitToDelete(foundedUnit);
  },

  addAssetInUnit: async (unitId: Types.ObjectId, newAssetUnit: Types.ObjectId) => {
    const updatedUnit = await Unit.updateOne(
      { _id: unitId },
      {
        $push: {
          assets: [{ _id: newAssetUnit }],
        },
      }
    );
    return updatedUnit;
  },

  removeAssetFromUnit: async (assetId: String, unitId: String) => {
    const updatedUnit = await Unit.updateOne(
      {
        _id: unitId,
      },
      {
        $pullAll: {
          assets: [{ _id: assetId }],
        },
      }
    );
  },

  findUnitByUnitAndAsset: async (newUnitId: String, assetId: String) => {
    let company = await Unit.findOne({ _id: newUnitId, assets: [{ _id: assetId }] });
    return company != null ? company : null;
  },

  moveAssetFromUnit: async (currentUnitId: String, assetId: String, newUnitId: String) => {
    const updatedCompanyRemoved = await Unit.updateOne(
      { _id: currentUnitId },
      {
        $pullAll: {
          assets: [{ _id: assetId }],
        },
      }
    );

    const updatedCompanyAdded = await Unit.updateOne(
      { _id: newUnitId },
      {
        $push: {
          assets: [{ _id: assetId }],
        },
      }
    );

    let updatedAssetUnit: updatedAsset = { unit: newUnitId };
    let updatedAsset = AssetService.editAsset(assetId, updatedAssetUnit);
    return [updatedCompanyRemoved, updatedCompanyAdded, updatedAsset];
  },
};

async function checkFoundedUnitToDelete(unit: any) {
  if (unit === null) {
    throw Error("Can't delete unit because it was not founded.");
  }
}
