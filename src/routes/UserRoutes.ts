import { validateRequest } from "../middleware/auth";
import { findAllUsers, createUser } from "../services/UserService";
const router = require("express").Router();

router.get("/find", validateRequest, findAllUsers);

router.post("/new", validateRequest, createUser);

export default router;
