import { unit } from "../interfaces/unit.interface";
import Unit from "../models/Unit";
export default {
  findAllUnits: async () => {
    const units = await Unit.find().populate("company");
    return units;
  },

  findUnit: async (id: String) => {
    const unit = await Unit.findOne({ _id: id }).populate("company");
    return unit;
  },

  createUnit: async (newUnitInfo: unit) => {
    let newUnit = await Unit.create(newUnitInfo);
    return newUnit;
  },

  editUnit: async (id: String, unitInfo: unit) => {
    const updatedUnit = await Unit.updateOne({ _id: id }, unitInfo);
    return updatedUnit;
  },

  deleteUnit: async (id: String, requesterId: String) => {
    let foundedUnit = await Unit.findByIdAndDelete({ _id: id });
    await checkFoundedUnitToDelete(foundedUnit);
  },
};

async function checkFoundedUnitToDelete(unit: any) {
  if (unit === null) {
    throw Error("Can't delete unit because it was not founded.");
  }
}
