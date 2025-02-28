import { Faculty, Student, Status, Program } from "../types";
import { validateEmail, validatePhone } from "../utils/dataValidation.ts";
import * as React from "react";
import axiosInstance from "../api/config.ts";
interface StudentFormProps {
  student: Partial<Student>;
  onSubmit: (student: Partial<Student>) => void;
  onClose: () => void;
  isEdit?: boolean;
}

const StudentForm = ({
  student,
  onSubmit,
  onClose,
  isEdit,
}: StudentFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const studentData: Partial<Student> = {
      student_id: formData.get("student_id") as string,
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      program_id: parseInt(formData.get("program_id") as string),
      status_id: parseInt(formData.get("status_id") as string),
      date_of_birth: new Date(formData.get("date_of_birth") as string),
      gender: formData.get("gender") as string,
      course_year: formData.get("course_year") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      faculty_id: parseInt(formData.get("faculty_id") as string),
    };
    if (!validateEmail(studentData?.email)) {
      alert("Invalid email");
      return;
    }
    if (!validatePhone(studentData?.phone)) {
      alert("Invalid phone number");
      return;
    }
    onSubmit(studentData);
  };

  const [faculties, setFaculties] = React.useState<Faculty[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [statuses, setStatuses] = React.useState<Status[]>([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const [facultiesRes, programsRes, statusesRes] = await Promise.all([
          axiosInstance.get("/faculties"),
          axiosInstance.get("/programs"),
          axiosInstance.get("/statuses"),
        ]);

        setFaculties(facultiesRes.data);
        setPrograms(programsRes.data);
        setStatuses(statusesRes.data);
      } catch (err) {
        console.error("Error loading form data:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3xl 2xl:w-5xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Student ID</label>
            <input
              type="number"
              name="student_id"
              defaultValue={student.student_id}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="full_name"
              defaultValue={student.full_name}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Faculty</label>
            <select
              name="faculty_id"
              defaultValue={student.faculty_id}
              className="w-full px-3 py-2 border rounded"
              required
            >
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.faculty_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              defaultValue={student.date_of_birth?.toString().split("T")[0]}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Gender</label>
            <select
              name="gender"
              defaultValue={student.gender}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Course Year</label>
            <input
              type="number"
              name="course_year"
              defaultValue={student.course_year}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={student.email}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Program</label>
            <select
              name="program_id"
              defaultValue={student.program_id}
              className="w-full px-3 py-2 border rounded"
              required
            >
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.program_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <textarea
              name="address"
              defaultValue={student.address}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              defaultValue={student.phone}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              name="status_id"
              defaultValue={student.status_id}
              className="w-full px-3 py-2 border rounded"
              required
            >
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.status_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
