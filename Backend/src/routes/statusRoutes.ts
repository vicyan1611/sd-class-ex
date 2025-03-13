import express, { Request, Response } from "express";
import Status from "../models/Status";
import Student from "../models/Student";

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

// Delete a status
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const statusId = req.params.id;
    const studentCount = await Student.count({
      where: { status_id: statusId },
    });
    if (studentCount > 0) {
      res
        .status(400)
        .json({ message: "Cannot delete status with associated students" });
    } else {
      const status = await Status.findByPk(statusId);
      if (!status) {
        res.status(404).json({ message: "Status not found" });
      } else {
        await Status.destroy({ where: { id: statusId } });
        res.json({ message: "Status deleted" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting status", error });
  }
});

export default router;
