import express from "express";
import Student from "../models/Student";
import { Op } from "sequelize";
import { Request, Response } from "express";
import Faculty from "../models/Faculty";
import Program from "../models/Program";
import Status from "../models/Status";
import Configuration from "../models/Configuration";
const router = express.Router();

// Get all students
router.get("/", async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll({
      include: [
        { model: Faculty, attributes: ["faculty_name"] },
        {
          model: Program,
          attributes: ["program_name"],
        },
        {
          model: Status,
          attributes: ["status_name"],
        },
      ],
    });
    if (!students) {
      res.status(404).json({ message: "Students not found" });
    } else {
      res.json(students);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// Get a student by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [
        { model: Faculty, attributes: ["faculty_name"] },
        {
          model: Program,
          attributes: ["program_name"],
        },
        {
          model: Status,
          attributes: ["status_name"],
        },
      ],
    });
    if (!student) {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.json(student);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
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
    console.log(req.body);
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
      const configData = await Configuration.findAll();
      if (!configData) {
        res.status(500).json({ message: "System configuration not found" });
      }

      const createdAt = new Date(student.createdAt);
      const currentDate = new Date();
      const minutesDifference =
        Math.floor(currentDate.getTime() - createdAt.getTime()) / 60000;

      if (minutesDifference < configData[0].studentDeletionTimeWindow) {
        res.status(400).json({
          message: `Student can't be deleted after ${configData[0].studentDeletionTimeWindow} minutes of creation`,
        });
      } else {
        await student.destroy();
        res.json({ message: "Student deleted successfully" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting student", error });
  }
});

// Search students
router.get("/search", async (req: Request, res: Response) => {
  try {
    const { studentName, studentId, facultyName } = req.query;
    console.log(studentName, studentId, facultyName);
    const students = await Student.findAll({
      where: {
        full_name: {
          [Op.like]: `%${studentName ? studentName : ""}%`,
        },
        student_id: {
          [Op.like]: `%${studentId ? studentId : ""}%`,
        },
      },
      include: [
        {
          model: Faculty,
          attributes: ["faculty_name"],
          where: {
            faculty_name: {
              [Op.like]: `%${facultyName ? facultyName : ""}%`,
            },
          },
        },
        {
          model: Program,
          attributes: ["program_name"],
        },
        {
          model: Status,
          attributes: ["status_name"],
        },
      ],
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error searching students", error });
  }
});

export default router;
