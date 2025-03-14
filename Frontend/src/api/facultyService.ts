import apiClient from "./apiClient";
import { Faculty } from "../types";

export const facultyService = {
  getAllFaculties: () => apiClient.get<Faculty[]>("/faculties"),
  getFacultyById: (id: number) => apiClient.get<Faculty>(`/faculties/${id}`),
  createFaculty: (faculty: Partial<Faculty>) =>
    apiClient.post<Faculty>("/faculties", faculty),
  updateFaculty: (id: number, faculty: Partial<Faculty>) =>
    apiClient.put<Faculty>(`/faculties/${id}`, faculty),
  deleteFaculty: (id: number) => apiClient.delete(`/faculties/${id}`),
};
