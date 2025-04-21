import { Router } from "express";

import {
  getImagesService,
  getContainersService,
  getVolumesService,
  getNetworksService,
  searchImageService,
  pullImageService,
  startContainerService,
  stopContainerService,
} from "../controllers/dockerController.js";

const router = Router();

// managing images
router.get("/images", getImagesService);
router.get("/images/search", searchImageService);
router.post("/images/pull", pullImageService);

// managing containers
router.get("/containers", getContainersService);
router.post("/containers/start", startContainerService);
router.post("/containers/stop", stopContainerService);

// managing networks
router.get("/networks", getNetworksService);

// managing volumes
router.get("/volumes", getVolumesService);

export default router;
