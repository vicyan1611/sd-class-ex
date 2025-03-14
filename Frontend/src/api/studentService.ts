import apiClient from "./apiClient";
import { Student } from "../types";

export const studentService = {
  getAllStudents: () => apiClient.get<Student[]>("/students"),
  getStudentById: (id: number) => apiClient.get<Student>(`/students/${id}`),
  createStudent: (student: Partial<Student>) =>
    apiClient.post<Student>("/students", student),
  updateStudent: (id: number, student: Partial<Student>) =>
    apiClient.put<Student>(`/students/${id}`, student),
  deleteStudent: (id: number) => apiClient.delete<Student>(`/students/${id}`),
  searchStudents: (params: {
    studentName?: string;
    studentId?: string;
    facultyName?: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params.studentName) {
      searchParams.append("studentName", params.studentName);
    }
    if (params.studentId) {
      searchParams.append("studentId", params.studentId);
    }
    if (params.facultyName) {
      searchParams.append("facultyName", params.facultyName);
    }
    return apiClient.get<Student[]>(`/students/search?${searchParams}`);
  },
};
