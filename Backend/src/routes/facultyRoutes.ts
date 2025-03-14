import express, { Request, Response } from "express";
import Faculty from "../models/Faculty";
import { Op } from "sequelize";
import Student from "../models/Student";

const router = express.Router();

// Get all faculties
router.get("/", async (req: Request, res: Response) => {
  try {
    const faculties = await Faculty.findAll();
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculties", error });
  }
});

// Get a single faculty by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id, {
      include: ["students"], // Include associated students
    });
    if (!faculty) {
      res.status(404).json({ message: "Faculty not found" });
    } else {
      res.json(faculty);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching faculty", error });
  }
});

// Add a new faculty
router.post("/", async (req: Request, res: Response) => {
  try {
    const newFaculty = await Faculty.create(req.body);
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(400).json({ message: "Error creating faculty", error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) {
      res.status(404).json({ message: "Faculty not found" });
    } else {
      await faculty.update(req.body);
      res.json(faculty);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating faculty", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const facultyId = req.params.id;
    const studentCount = await Student.count({
      where: { faculty_id: facultyId },
    });
    if (studentCount > 0) {
      res.status(400).json({ message: "Cannot delete faculty with students" });
    } else {
      const faculty = await Faculty.findByPk(facultyId);
      if (!faculty) {
        res.status(404).json({ message: "Faculty not found" });
      } else {
        await faculty.destroy();
        res.json({ message: "Faculty deleted" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting faculty", error });
  }
});

export default router;
