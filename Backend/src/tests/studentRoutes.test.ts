import request from "supertest";
import express from "express";
import studentRoutes from "../routes/studentRoutes";
import sequelize from "../config/database";
import Student from "../models/Student";
const app = express();
app.use(express.json());
app.use("/api/students", studentRoutes);

describe("Student Routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    // Add test data
    await Student.create({
      student_id: "TEST001",
      faculty_id: 1,
      full_name: "Test Student",
      date_of_birth: new Date("2000-01-01"),
      gender: "Male",
      course_year: "2023",
      program_id: 1,
      address: "Test Address",
      email: "test@student.edu.vn",
      phone: "0987654321",
      status_id: 1,
    });
  });

  it("should get all students", async () => {
    const response = await request(app).get("/api/students");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });
  it("should create a new student", async () => {
    const newStudent = {
      student_id: "TEST002",
      faculty_id: 1,
      full_name: "Another Test Student",
      date_of_birth: "2001-02-02",
      gender: "Female",
      course_year: "2023",
      program_id: 1,
      address: "Another Test Address",
      email: "another@student.edu.vn",
      phone: "0987654322",
      status_id: 1,
    };

    const response = await request(app).post("/api/students").send(newStudent);

    expect(response.status).toBe(201);
  });
  it("should update a student", async () => {
    const student = await Student.findOne({ where: { student_id: "TEST001" } });

    const response = await request(app)
      .put(`/api/students/${student?.id}`)
      .send({ full_name: "Updated Test Student" });

    expect(response.status).toBe(200);

    const updatedStudent = await Student.findByPk(student?.id);
    expect(updatedStudent?.full_name).toBe("Updated Test Student");
  });
});
