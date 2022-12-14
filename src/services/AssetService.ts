import { Types } from "mongoose";
import { asset, updatedAsset } from "../interfaces/asset.interface";
import Asset from "../models/Asset";
export default {
  findAllAssets: async () => {
    const assets = await Asset.find().populate("company");
    return assets;
  },

  findAsset: async (id: String | Types.ObjectId) => {
    const asset = await Asset.findOne({ _id: id }).populate("company");
    return asset;
  },

  createAsset: async (newAssetInfo: asset) => {
    let newAsset = await Asset.create(newAssetInfo);
    return newAsset;
  },

  editAsset: async (id: String, assetInfo: updatedAsset) => {
    const updatedAsset = await Asset.updateOne({ _id: id }, assetInfo);
    return updatedAsset;
  },

  deleteAsset: async (id: String) => {
    let foundedAsset = await Asset.findByIdAndDelete({ _id: id });
    await checkFoundedAssetToDelete(foundedAsset);
  },
};

async function checkFoundedAssetToDelete(asset: any) {
  if (asset === null) {
    throw Error("Can't delete asset because it was not founded.");
  }
}
