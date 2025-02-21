import express from "express";
import Student from "../models/Student";
import { Op } from "sequelize";
import { Request, Response } from "express";
const router = express.Router();

// Get all students
router.get("/", async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    if (!students) {
      res.status(404).json({ message: "Students not found" });
    } else {
      res.json(students);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Add a new student
router.post("/", async (req: Request, res: Response) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json("Creating student successfully");
  } catch (error) {
    res.status(400).json({ message: "Error creating student", error });
  }
});

// Update a student
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    } else {
      await student.update(req.body);
      res.json(student);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating student", error });
  }
});

// Delete a student
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    } else {
      await student.destroy();
      res.json({ message: "Student deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting student", error });
  }
});

// Search students
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const students = await Student.findAll({
      where: {
        [Op.or]: [
          { student_id: { [Op.iLike]: `%${query}%` } },
          { full_name: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error searching students", error });
  }
});

export default router;
