import express from "express";
import { Router } from "express";

import AreaController from "../controller/area-controller.js";


const router = new Router();

router.get("/areas", express.json(), AreaController.getAllAreas);
router.get("/areas/:area", express.json(), AreaController.getArea);

router.get("/search", express.json(), AreaController.searchArea);
// router.delete("/areas/:id", express.json(), AreaController.deleteArea);

export default router;