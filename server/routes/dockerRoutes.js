import { Router } from "express";

import {
  getImagesService,
  getContainersService,
} from "../controllers/dockerController.js";

const router = Router();

router.get("/images", getImagesService);
router.get("/containers", getContainersService);

export default router;
