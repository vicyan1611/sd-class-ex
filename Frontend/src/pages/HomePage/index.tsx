import { useState, useEffect } from "react";
import StudentTable from "../../components/StudentTable";
import SearchBar from "../../components/SearchBar";
import StudentForm from "../../components/StudentForm";
import { Student } from "../../types";
import axiosInstance from "../../api/config";
import AboutDialogue from "../../components/AboutDialogue";
import { useNavigate } from "react-router-dom";
import ImportExportDialog from "../../components/ImportExportDialog";
import StatusCertificateDialog from "../../components/StatusCertificateDialog";

const HomePage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState({
    studentName: "",
    studentId: "",
    facultyName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showCertificateDialog, setShowCertificateDialog] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [selectedStudent, setSelectStudent] = useState<Partial<Student>>({});
  const [isEdit, setIsEdit] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get("/students");
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      // setError(err instanceof Error ? err.message : "An error occurred");
      console.log(err);
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

  const handleCertificate = (student: Student) => {
    setSelectStudent(student);
    setShowCertificateDialog(true);
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
        await axiosInstance.put(`/students/${selectedStudent.id}`, student);
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
    if (
      !searchQuery.studentName &&
      !searchQuery.studentId &&
      !searchQuery.facultyName
    ) {
      fetchStudents();
      return;
    }

    try {
      const params = new URLSearchParams({
        ...(searchQuery.studentName && {
          studentName: searchQuery.studentName,
        }),
        ...(searchQuery.studentId && { studentId: searchQuery.studentId }),
        ...(searchQuery.facultyName && {
          facultyName: searchQuery.facultyName,
        }),
      });

      const response = await axiosInstance.get(`/students/search?${params}`);
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
      <button
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => {
          navigate("/management-settings");
        }}
      >
        Management Settings
      </button>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => {
          navigate("/configurations");
        }}
      >
        Configurations
      </button>

      <button
        onClick={() => setShowAbout(true)}
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
      >
        About App
      </button>
      <button
        onClick={() => setShowImportExport(true)}
        className="mb-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 ml-2"
      >
        Import/Export Data
      </button>
      {showImportExport && (
        <ImportExportDialog
          students={students}
          onClose={() => setShowImportExport(false)}
          onImportComplete={fetchStudents}
        />
      )}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onExport={handleCertificate}
      />
      {showForm && (
        <StudentForm
          student={selectedStudent}
          onSubmit={handleSubmit}
          isEdit={isEdit}
          onClose={() => setShowForm(false)}
        />
      )}
      {showCertificateDialog && (
        <StatusCertificateDialog
          student={selectedStudent}
          onClose={() => setShowCertificateDialog(false)}
        />
      )}
      {showAbout && <AboutDialogue onClose={() => setShowAbout(false)} />}
    </div>
  );
};

export default HomePage;
