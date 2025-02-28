import sequelize from "../config/database";

beforeAll(async () => {
  // Setup test database or mock as needed
});

afterAll(async () => {
  await sequelize.close();
});
