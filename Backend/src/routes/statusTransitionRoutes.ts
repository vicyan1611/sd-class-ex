import express, { Request, Response } from "express";
import StatusTransition from "../models/StatusTransition";
import Status from "../models/Status";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const statusTransitions = await StatusTransition.findAll({
      include: [
        { model: Status, as: "from_status", attributes: ["status_name"] },
        { model: Status, as: "to_status", attributes: ["status_name"] },
      ],
    });
    res.json(statusTransitions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching status transitions", error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const statusTransition = await StatusTransition.findByPk(req.params.id);
    if (!statusTransition) {
      res.status(404).json({ message: "Status transition not found" });
    } else {
      res.json(statusTransition);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching status transition", error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const newStatusTransition = await StatusTransition.create(req.body);
    res.status(201).json(newStatusTransition);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating status transition", error });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const statusTransition = await StatusTransition.findByPk(req.params.id);
    if (!statusTransition) {
      res.status(404).json({ message: "Status transition not found" });
    } else {
      await statusTransition.destroy();
      res.json({ message: "Status transition deleted successfully" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting status transition", error });
  }
});

export default router;
