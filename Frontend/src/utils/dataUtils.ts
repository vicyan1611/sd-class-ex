import { Student } from "../types";
import axiosInstance from "../api/config";

export const exportToCSV = (students: Student[]) => {
  const headers = [
    "student_id",
    "facultyId",
    "full_name",
    "date_of_birth",
    "gender",
    "course_year",
    "program_id",
    "address",
    "email",
    "phone",
    "status_id",
  ];

  const csvContent = [
    headers.join(","),
    ...students.map((student) =>
      headers
        .map((header) => {
          const value = student[header as keyof Student];
          return header === "date_of_birth"
            ? new Date(value as Date).toISOString().split("T")[0]
            : value;
        })
        .join(","),
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "students.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (students: Student[]) => {
  const jsonContent = JSON.stringify(students, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "students.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = async (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n");
        const headers = lines[0].split(",");
        const students: Student[] = [];

        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;

          const values = lines[i].split(",");
          const student: Partial<Student> = {};

          headers.forEach((header, index) => {
            const trimmedHeader = header.trim() as Exclude<
              keyof Student,
              "Faculty" | "Program" | "Status"
            >;
            const value = values[index].trim();

            if (trimmedHeader === "date_of_birth") {
              student[trimmedHeader] = new Date(value);
            } else {
              student[trimmedHeader] = value;
            }
          });

          if (student.date_of_birth) {
            student.date_of_birth = new Date(student.date_of_birth);
          }

          students.push(student as Student);
        }

        // Send students to backend
        for (const student of students) {
          await axiosInstance.post("/students", student);
        }

        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};

export const importFromJSON = async (file: File): Promise<Student[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const students: Student[] = JSON.parse(text);

        // Send students to backend
        for (const student of students) {
          await axiosInstance.post("/students", student);
        }

        resolve(students);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
};
