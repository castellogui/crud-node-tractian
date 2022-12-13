import { validateRequest } from "../middleware/auth";
import {
  findAllUsers,
  findUser,
  createUser,
  editUser,
  deleteUser,
} from "../controllers/UserController";
const router = require("express").Router();

router.get("/find", validateRequest, findAllUsers);

router.get("/find/:id", validateRequest, findUser);

router.post("/new", validateRequest, createUser);

router.put("/edit/:id", validateRequest, editUser);

router.delete("/delete/:id", validateRequest, deleteUser);

export default router;
