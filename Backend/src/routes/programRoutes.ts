import express, { Request, Response } from "express";
import Program from "../models/Program";
const router = express.Router();

// Get all programs
router.get("/", async (req: Request, res: Response) => {
  try {
    const programs = await Program.findAll();
    if (!programs) {
      res.status(404).json({ message: "Programs not found" });
    } else {
      res.json(programs);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error });
  }
});

// Get a single program
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      res.status(404).json({ message: "Program not found" });
    } else {
      res.json(program);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching program", error });
  }
});

// Add a new program
router.post("/", async (req: Request, res: Response) => {
  try {
    const newProgram = await Program.create(req.body);
    res.status(201).json(newProgram);
  } catch (error) {
    res.status(400).json({ message: "Error creating program", error });
  }
});

// Update a program
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      res.status(404).json({ message: "Program not found" });
    } else {
      await program.update(req.body);
      res.json(program);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating program", error });
  }
});

// Delete a program
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      res.status(404).json({ message: "Program not found" });
    } else {
      await program.destroy();
      res.json({ message: "Program deleted successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error deleting program", error });
  }
});

export default router;
