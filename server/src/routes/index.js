import { Router } from "express";
import authRoutes from "../modules/auth/routes.js";
import carRoutes from "../modules/car/routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/car", carRoutes);

export default router;
