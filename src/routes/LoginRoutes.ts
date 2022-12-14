import { login } from "../controllers/LoginController";
const router = require("express").Router();

router.post("/login", login);

export default router;
