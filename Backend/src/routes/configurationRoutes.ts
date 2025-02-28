import express, { Request, Response } from "express";
import Configuration from "../models/Configuration";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const config = await Configuration.findAll();
    res.json(config);
  } catch (error) {
    res.status(500).json({ message: "Error fetching configuration", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newConfig = await Configuration.create(req.body);
    res.status(201).json(newConfig);
  } catch (error) {
    res.status(400).json({ message: "Error creating configuration", error });
  }
});

router.put(":/id", async (req: Request, res: Response) => {
  try {
    const config = await Configuration.findByPk(req.params.id);
    if (!config) {
      res.status(404).json({ message: "Configuration not found" });
    } else {
      await config.update(req.body);
      res.json(config);
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating configuration", error });
  }
});

export default router;
