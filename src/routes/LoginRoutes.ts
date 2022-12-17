import { getUserData, login } from "../controllers/LoginController";
import { validateRequest } from "../middleware/auth";
const router = require("express").Router();

router.post("/authUser", login);
router.post("/getUserData", validateRequest, getUserData);

export default router;
