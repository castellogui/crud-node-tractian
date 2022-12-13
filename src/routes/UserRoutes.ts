import { validateRequest } from "../middleware/auth";
import { findAllUsers, createUser, editUser, deleteUser, findUser } from "../services/UserService";
const router = require("express").Router();

router.get("/find", validateRequest, findAllUsers);

router.get("/find/:id", validateRequest, findUser);

router.post("/new", validateRequest, createUser);

router.put("/edit/:id", validateRequest, editUser);

router.delete("/delete/:id", validateRequest, deleteUser);

export default router;
