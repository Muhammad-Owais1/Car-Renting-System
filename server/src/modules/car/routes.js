import { Router } from "express";
import carAddController from "./controller/addCar.js";
import getCarController from "./controller/getCar.js";
import getAllCarsController from "./controller/getAllCars.js";
import requestCarController from "./controller/requestCar.js";
import deleteCarController from "./controller/deleteCar.js";
import approveReqController from "./controller/approveReq.js";
import authentication from "../../helper/tokenHandler.js";

const router = Router();

router.post("/addcar", authentication, carAddController);
router.get("/getcar", authentication, getCarController);
router.get("/getallcars", authentication, getAllCarsController);
router.patch("/requestcar", authentication, requestCarController);
router.post("/deletecar", authentication, deleteCarController);
router.patch("/approvecarreq", authentication, approveReqController);

export default router;
