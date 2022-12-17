import { Request, Response } from "express";
import { asset, updatedAsset } from "../interfaces/asset.interface";
import UnitService from "../services/UnitService";
import { checkEntityNotFoundOrNotModified } from "../utils/entity";
import handleRequestError from "../utils/error";
import AssetService from "../services/AssetService";
import UserService from "../services/UserService";

export const findAllAssets = async (req: Request, res: Response) => {
  try {
    let assets = await AssetService.findAllAssets();
    res.status(200).send(assets);
  } catch (error) {
    handleRequestError(error, res, "find", "assets");
  }
};

export const findAsset = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let asset = await AssetService.findAsset(id);
    res.status(200).send({ asset });
  } catch (error) {
    handleRequestError(error, res, "find", "asset");
  }
};

export const createAsset = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(422).send({ message: "Body request empty." });
      return;
    }

    const newAssetInfo: asset = {
      name: req.body.name,
      unit: req.body.unit,
      description: req.body.description,
      image: req.body.image,
      model: req.body.model,
      owner: req.body.owner,
      status: req.body.status,
      healthLevel: req.body.healthLevel,
      created_at: req.body.created_at,
    };

    checkEntityNotFoundOrNotModified(await UnitService.findUnit(newAssetInfo.unit));
    let newAsset = await AssetService.createAsset(newAssetInfo);
    await UnitService.addAssetInUnit(newAssetInfo.unit, newAsset._id);
    res.status(201).send({ message: "Asset created.", newAsset });
  } catch (error) {
    handleRequestError(error, res, "create", "a new asset");
  }
};

export const editAsset = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    const assetInfo: updatedAsset = {
      name: req.body.name,
      unit: req.body.unit,
      description: req.body.description,
      image: req.body.image,
      model: req.body.model,
      owner: req.body.owner,
      status: req.body.status,
      healthLevel: req.body.healthLevel,
      created_at: req.body.created_at,
    };

    checkEntityNotFoundOrNotModified(await UnitService.findUnit(assetInfo.unit));
    checkEntityNotFoundOrNotModified(await UserService.findUser(assetInfo.owner));
    let updatedAsset = await AssetService.editAsset(id, assetInfo);
    checkEntityNotFoundOrNotModified(updatedAsset);
    res.status(200).send({ message: "Asset updated.", updatedAsset });
  } catch (error) {
    handleRequestError(error, res, "edit", "asset");
  }
};

export const deleteAsset = async (req: Request, res: Response) => {
  try {
    let assetId = req.params.id;
    let unitId = req.body.unitId;
    await AssetService.deleteAsset(assetId);
    checkEntityNotFoundOrNotModified(await UnitService.findUnit(unitId));
    await UnitService.removeAssetFromUnit(assetId, unitId);
    res.status(200).send({ message: "Asset deleted." });
  } catch (error) {
    handleRequestError(error, res, "delete", "asset");
  }
};
