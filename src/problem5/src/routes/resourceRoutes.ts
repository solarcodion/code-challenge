import express from "express";
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} from "../controllers/resourceController";

const router = express.Router();

router.route("/").get(getResources).post(createResource);

router
  .route("/:id")
  .get(getResourceById)
  .put(updateResource)
  .delete(deleteResource);

export default router;
