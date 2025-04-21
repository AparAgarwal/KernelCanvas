import Docker from "dockerode";
import AppError from "../utils/AppError.js";

// retrieve all containers from docker
export async function getContainersService(_req, res, next) {
  try {
    const docker = new Docker();
    const containers = await docker.listContainers({ all: true });

    return res.status(200).json(containers);
  } catch (error) {
    next(new AppError("Error fetching containers", 500));
  }
}

// retrieve all images from docker
export async function getImagesService(_req, res, next) {
  try {
    const docker = new Docker();
    const images = await docker.listImages();

    return res.status(200).json(images);
  } catch (error) {
    next(new AppError("Error fetching images", 500));
  }
}
