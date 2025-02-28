import { useState, useEffect } from "react";
import axiosInstance from "../../api/config";
import { Faculty, Program, Status } from "../../types";

const ManagementSettings = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newProgramName, setNewProgramName] = useState("");

  const [newStatusName, setNewStatusName] = useState("");

  const [editingFacultyId, setEditingFacultyId] = useState<number | null>(null);
  const [editingFacultyName, setEditingFacultyName] = useState("");
  const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
  const [editingProgramName, setEditingProgramName] = useState("");
  const [editingStatusId, setEditingStatusId] = useState<number | null>(null);
  const [editingStatusName, setEditingStatusName] = useState("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaculties();
    fetchPrograms();
    fetchStatuses();
  }, []);

  const fetchFaculties = async () => {
    try {
      const response = await axiosInstance.get("/faculties");
      setFaculties(response.data);
    } catch (err) {
      setError("Failed to fetch faculties" + err);
    }
  };

  const fetchPrograms = async () => {
    try {
      const response = await axiosInstance.get("/programs");
      setPrograms(response.data);
    } catch (err) {
      setError("Failed to fetch programs" + err);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axiosInstance.get("/statuses");
      setStatuses(response.data);
    } catch (err) {
      setError("Failed to fetch statuses" + err);
    }
  };

  const handleAddFaculty = async () => {
    if (!newFacultyName.trim()) return;

    try {
      await axiosInstance.post("/faculties", {
        faculty_name: newFacultyName,
      });
      setNewFacultyName("");

      fetchFaculties();
    } catch (err) {
      setError("Failed to add faculty" + err);
    }
  };

  const handleAddProgram = async () => {
    if (!newProgramName.trim()) return;

    try {
      await axiosInstance.post("/programs", {
        program_name: newProgramName,
      });
      setNewProgramName("");

      fetchPrograms();
    } catch (err) {
      setError("Failed to add program" + err);
    }
  };

  const handleAddStatus = async () => {
    if (!newStatusName.trim()) return;

    try {
      await axiosInstance.post("/statuses", {
        status_name: newStatusName,
      });
      setNewStatusName("");

      fetchStatuses();
    } catch (err) {
      setError("Failed to add status" + err);
    }
  };

  const handleEditFaculty = async (faculty: Faculty) => {
    if (editingFacultyId === faculty.id) {
      try {
        await axiosInstance.put(`/faculties/${faculty.id}`, {
          faculty_name: editingFacultyName,
        });
        setEditingFacultyId(null);
        setEditingFacultyName("");
        fetchFaculties();
      } catch (err) {
        setError("Failed to update faculty" + err);
      }
    } else {
      setEditingFacultyId(faculty.id);
      setEditingFacultyName(faculty.faculty_name);
    }
  };

  const handleEditProgram = async (program: Program) => {
    if (editingProgramId === program.id) {
      try {
        await axiosInstance.put(`/programs/${program.id}`, {
          program_name: editingProgramName,
        });
        setEditingProgramId(null);
        setEditingProgramName("");
        fetchPrograms();
      } catch (err) {
        setError("Failed to update program" + err);
      }
    } else {
      setEditingProgramId(program.id);
      setEditingProgramName(program.program_name);
    }
  };

  const handleEditStatus = async (status: Status) => {
    if (editingStatusId === status.id) {
      try {
        await axiosInstance.put(`/statuses/${status.id}`, {
          status_name: editingStatusName,
        });
        setEditingStatusId(null);
        setEditingStatusName("");
        fetchStatuses();
      } catch (err) {
        setError("Failed to update status" + err);
      }
    } else {
      setEditingStatusId(status.id);
      setEditingStatusName(status.status_name);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-bold mb-6">Management Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Faculties Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Faculties</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newFacultyName}
            onChange={(e) => setNewFacultyName(e.target.value)}
            placeholder="New faculty name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddFaculty}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Faculty
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {faculties.map((faculty) => (
            <div
              key={faculty.id}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              {editingFacultyId === faculty.id ? (
                <input
                  type="text"
                  value={editingFacultyName}
                  onChange={(e) => setEditingFacultyName(e.target.value)}
                  className="px-2 py-1 border rounded"
                />
              ) : (
                <span>{faculty.faculty_name}</span>
              )}
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEditFaculty(faculty)}
              >
                {editingFacultyId === faculty.id ? "Save" : "Edit"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Programs Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Programs</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newProgramName}
            onChange={(e) => setNewProgramName(e.target.value)}
            placeholder="New program name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddProgram}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Program
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {programs.map((program) => (
            <div
              key={program.id}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              {editingProgramId === program.id ? (
                <input
                  type="text"
                  value={editingProgramName}
                  onChange={(e) => setEditingProgramName(e.target.value)}
                  className="px-2 py-1 border rounded"
                />
              ) : (
                <span>{program.program_name}</span>
              )}
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEditProgram(program)}
              >
                {editingProgramId === program.id ? "Save" : "Edit"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Student Status Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Student Statuses</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            placeholder="New status name"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddStatus}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Status
          </button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {statuses.map((status) => (
            <div
              key={status.id}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              {editingStatusId === status.id ? (
                <input
                  type="text"
                  value={editingStatusName}
                  onChange={(e) => setEditingStatusName(e.target.value)}
                  className="px-2 py-1 border rounded"
                />
              ) : (
                <span>{status.status_name}</span>
              )}
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEditStatus(status)}
              >
                {editingStatusId === status.id ? "Save" : "Edit"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagementSettings;
