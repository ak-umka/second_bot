import express from "express";
import { Router } from "express";

import AreaController from "../controller/area-controller.js";


const router = new Router();

router.get("/areas", express.json(), AreaController.getAllAreas);
router.get("/areas/:area", express.json(), AreaController.getArea);
router.get("/images", express.json(), AreaController.getAreaImage);
router.get("/violation", express.json(), AreaController.getViolationImage);
router.get("/search", express.json(), AreaController.searchArea);
// router.delete("/areas/:id", express.json(), AreaController.deleteArea);

export default router;