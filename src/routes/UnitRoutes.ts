import { validateRequest } from "../middleware/auth";
import {
  findAllUnits,
  findUnit,
  createUnit,
  editUnit,
  deleteUnit,
  moveAssetFromUnit,
} from "../controllers/UnitController";
const router = require("express").Router();

router.get("/find", validateRequest, findAllUnits);

router.get("/find/:id", validateRequest, findUnit);

router.post("/new", validateRequest, createUnit);

router.put("/edit/:id", validateRequest, editUnit);

router.delete("/delete/:id", validateRequest, deleteUnit);

router.put("/moveAsset/:id", validateRequest, moveAssetFromUnit);

export default router;
