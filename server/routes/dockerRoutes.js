import { Router } from "express";

import {
  getImagesService,
  getContainersService,
  getVolumesService,
  getNetworksService,
  searchImageService,
  pullImageService,
} from "../controllers/dockerController.js";

const router = Router();

// fetching
router.get("/images", getImagesService);
router.get("/containers", getContainersService);
router.get("/volumes", getVolumesService);
router.get("/networks", getNetworksService);

// docker hub
router.get("/images/search", searchImageService);
router.post("/images/pull", pullImageService);

export default router;
