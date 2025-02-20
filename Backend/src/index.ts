import express from "express";
import studentRoutes from "./routes/studentRoutes";
import facultiesRoutes from "./routes/facultyRoutes";
import cors from "cors";
import sequelize from "./config/database";
import { initializeData } from "./seeders/initialData";
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);
app.use("/api/faculties", facultiesRoutes);

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
