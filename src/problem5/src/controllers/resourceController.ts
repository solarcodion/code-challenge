import { Request, Response } from "express";
import Resource, { IResource } from "../models/Resource";

// Get all resources with optional filters
export const getResources = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract filter parameters from query
    const filters: any = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.name)
      filters.name = { $regex: req.query.name, $options: "i" };

    const resources = await Resource.find(filters);
    res
      .status(200)
      .json({ success: true, count: resources.length, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Get single resource by ID
export const getResourceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      res.status(404).json({ success: false, error: "Resource not found" });
      return;
    }

    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// Create new resource
export const createResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

// Update resource
export const updateResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!resource) {
      res.status(404).json({ success: false, error: "Resource not found" });
      return;
    }

    res.status(200).json({ success: true, data: resource });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (val: any) => val.message
      );
      res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
};

// Delete resource
export const deleteResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      res.status(404).json({ success: false, error: "Resource not found" });
      return;
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
