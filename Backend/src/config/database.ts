import { Sequelize } from "sequelize";
const config = require("./config.json");
const env = process.env.NODE_ENV || "development";

const dbConfig = config[env];

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
  },
);

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error);
  }
})();

export default sequelize;
