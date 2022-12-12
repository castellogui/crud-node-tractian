import { validateRequest } from "../middleware/auth";
import { findAllUsers, createUser, editUser } from "../services/UserService";
const router = require("express").Router();

router.get("/find", validateRequest, findAllUsers);

router.post("/new", validateRequest, createUser);

router.patch("/edit/:id", validateRequest, editUser);

export default router;
