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

// retrieve all volumes
export async function getVolumesService(_req, res, next) {
  try {
    const docker = new Docker();
    const volumes = await docker.listVolumes();

    return res.status(200).json(volumes);
  } catch (error) {
    next(new AppError("Error fetching volumes", 500));
  }
}

// retrieve all networks
export async function getNetworksService(_req, res, next) {
  try {
    const docker = new Docker();
    const networks = await docker.listNetworks();

    return res.status(200).json(networks);
  } catch (error) {
    next(new AppError("Error fetching networks", 500));
  }
}

// search image on docker hub
export async function searchImageService(req, res, next) {
  try {
    const { s } = req.query;
    if (!s) {
      next(new AppError("Query parameter is required", 400));
    }

    // use v2 Docker Hub Registry API which is more reliable
    const response = await fetch(
      `https://registry.hub.docker.com/v2/search/repositories?query=${s}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    next(new AppError("Error searching image on docker hub", 500));
  }
}

// pull image from docker hub
export async function pullImageService(req, res, next) {
  try {
    const docker = new Docker();
    const { imageName, tag = "latest" } = req.body;

    docker.pull(`${imageName}:${tag}`, (err, stream) => {
      if (err) {
        next(new AppError("Error pulling umage from docker hub", 500));
      }

      docker.modem.followProgress(stream, (err, output) => {
        if (err) {
          next(new AppError("Error pulling image from docker hub", 500));
        }

        res.status(200).json({ message: "Image pulled successfully", output });
      });
    });
  } catch (error) {
    next(new AppError("Error pulling image from docker hub", 500));
  }
}

// create container
// start container
export async function startContainerService(req, res, next) {
  try {
    const docker = new Docker();
    const { containerId } = req.body;

    if (!containerId) {
      next(new AppError("Container ID is required", 400));
    }

    const container = docker.getContainer(containerId);
    await container.start();

    res.status(200).json({ message: "Container started successfully" });
  } catch (error) {
    next(new AppError("Error starting container", 500));
  }
}

// stop container
export async function stopContainerService(req, res, next) {
  try {
    const docker = new Docker();
    const { containerId } = req.body;

    if (!containerId) {
      next(new AppError("Container ID is required", 400));
    }

    const container = docker.getContainer(containerId);
    await container.stop();

    res.status(200).json({ message: "Container stopped successfully" });
  } catch (error) {
    next(new AppError("Error stopping container", 500));
  }
}
