import { Router } from "express";
import registerController from "./controller/register.js";
import loginController from "./controller/login.js";
import getUserController from "./controller/getUser.js";
import authentication from "../../helper/tokenHandler.js";
import logoutController from "./controller/logout.js";

const router = Router();

router.post("/signup", registerController);
router.post("/signin", loginController);
router.post("/logout", authentication, logoutController);
router.get("/getinfo", authentication, getUserController);

export default router;
