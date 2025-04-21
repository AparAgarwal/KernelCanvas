import { Router } from "express";

import {
  getImagesService,
  getContainersService,
  getVolumesService,
  getNetworksService,
} from "../controllers/dockerController.js";

const router = Router();

// fetching
router.get("/images", getImagesService);
router.get("/containers", getContainersService);
router.get("/volumes", getVolumesService);
router.get("/networks", getNetworksService);

export default router;
