import { validateRequest } from "../middleware/auth";
import {
  findAllAssets,
  findAsset,
  createAsset,
  editAsset,
  deleteAsset,
} from "../controllers/AssetController";
const router = require("express").Router();

router.get("/find", validateRequest, findAllAssets);

router.get("/find/:id", validateRequest, findAsset);

router.post("/new", validateRequest, createAsset);

router.put("/edit/:id", validateRequest, editAsset);

router.delete("/delete/:id", validateRequest, deleteAsset);

export default router;
