import express, { Request, Response } from "express";
import Status from "../models/Status";

const router = express.Router();

// Get all statuses
router.get("/", async (req: Request, res: Response) => {
  try {
    const statuses = await Status.findAll();
    res.json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statuses", error });
  }
});

// Get a single status
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      res.status(404).json({ message: "Status not found" });
    } else {
      res.json(status);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching status", error });
  }
});

// Add a new status
router.post("/", async (req: Request, res: Response) => {
  try {
    const newStatus = await Status.create(req.body);
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(400).json({ message: "Error creating status", error });
  }
});

// Update a status
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const status = await Status.findByPk(req.params.id);
    if (!status) {
      res.status(404).json({ message: "Status not found" });
    } else {
      await status.update(req.body);
      res.json(status);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating status", error });
  }
});

export default router;
