import { useState, useEffect } from "react";
import StudentTable from "../../components/StudentTable";
import SearchBar from "../../components/SearchBar";
import StudentForm from "../../components/StudentForm";
import { Student } from "../../types";
import axiosInstance from "../../api/config";

const HomePage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectStudent] = useState<Partial<Student>>({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectStudent({});
    setIsEdit(false);
    setShowForm(true);
  };

  const handleEdit = (student: Student) => {
    setSelectStudent(student);
    setIsEdit(true);
    setShowForm(true);
  };

  const handleDelete = async (student: Student) => {
    try {
      await axiosInstance.delete(`/students/${student.student_id}`);
      fetchStudents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleSubmit = async (student: Partial<Student>) => {
    try {
      if (isEdit) {
        await axiosInstance.put(
          `/students/${selectedStudent.student_id}`,
          student,
        );
      } else {
        await axiosInstance.post("/students", student);
      }
      fetchStudents();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const searchStudents = async () => {
    if (!searchQuery.trim()) {
      fetchStudents();
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/students/search?query=${searchQuery}`,
      );
      setStudents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchStudents();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-6 mx-auto">
        Student Management System
      </h1>
      <button
        onClick={handleAddNew}
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        Add New Student
      </button>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showForm && (
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          isEdit={isEdit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
