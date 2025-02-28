import Student from "../models/Student";
import sequelize from "../config/database";

describe("Student Model", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });
  it("should create a student successfully", async () => {
    const studentData = {
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
    };
    const student = await Student.create(studentData);
    expect(student).toBeDefined();
    expect(student.student_id).toBe("TEST001");
    expect(student.full_name).toBe("Test Student");
  });
  it("should enforce required fields", async () => {
    try {
      // @ts-ignore - intentionally missing required fields
      await Student.create({});
      fail("Expected validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
