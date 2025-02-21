import express from "express";
import studentRoutes from "./routes/studentRoutes";
import facultiesRoutes from "./routes/facultyRoutes";
import programRoutes from "./routes/programRoutes";
import statusRoutes from "./routes/statusRoutes";
import cors from "cors";
import sequelize from "./config/database";
import { initializeData } from "./seeders/initialData";
import { requestLogger } from "./middleware/requestLogger";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/faculties", facultiesRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/statuses", statusRoutes);

sequelize
  .sync()
  .then(async () => {
    await initializeData();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
