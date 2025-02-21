import { useState, useEffect } from "react";
import axiosInstance from "../../api/config";

interface Faculty {
  id: string;
  name: string;
}

interface Program {
  id: string;
  name: string;
}

const STATUS_OPTIONS = [
  "Đang học",
  "Đã tốt nghiệp",
  "Đã thôi học",
  "Tạm dừng học",
];

const ManagementSettings = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [newFacultyName, setNewFacultyName] = useState("");
  const [newProgramName, setNewProgramName] = useState("");
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFaculties();
    fetchPrograms();
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

  const handleAddFaculty = async () => {
    if (!newFacultyName.trim()) return;
    try {
      await axiosInstance.post("/faculties", { name: newFacultyName });
      setNewFacultyName("");
      fetchFaculties();
    } catch (err) {
      setError("Failed to add faculty" + err);
    }
  };

  const handleAddProgram = async () => {
    if (!newProgramName.trim()) return;
    try {
      await axiosInstance.post("/programs", { name: newProgramName });
      setNewProgramName("");
      fetchPrograms();
    } catch (err) {
      setError("Failed to add program" + err);
    }
  };

  const handleUpdateFaculty = async (id: string, newName: string) => {
    try {
      await axiosInstance.put(`/faculties/${id}`, { name: newName });
      setEditingFaculty(null);
      fetchFaculties();
    } catch (err) {
      setError("Failed to update faculty" + err);
    }
  };

  const handleUpdateProgram = async (id: string, newName: string) => {
    try {
      await axiosInstance.put(`/programs/${id}`, { name: newName });
      setEditingProgram(null);
      fetchPrograms();
    } catch (err) {
      setError("Failed to update program" + err);
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
              {editingFaculty?.id === faculty.id ? (
                <input
                  type="text"
                  value={editingFaculty.name}
                  onChange={(e) =>
                    setEditingFaculty({
                      ...editingFaculty,
                      name: e.target.value,
                    })
                  }
                  className="px-2 py-1 border rounded"
                />
              ) : (
                <span>{faculty.name}</span>
              )}
              <div>
                {editingFaculty?.id === faculty.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateFaculty(faculty.id, editingFaculty.name)
                      }
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingFaculty(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingFaculty(faculty)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                )}
              </div>
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
              {editingProgram?.id === program.id ? (
                <input
                  type="text"
                  value={editingProgram.name}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      name: e.target.value,
                    })
                  }
                  className="px-2 py-1 border rounded"
                />
              ) : (
                <span>{program.name}</span>
              )}
              <div>
                {editingProgram?.id === program.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateProgram(program.id, editingProgram.name)
                      }
                      className="text-green-600 hover:text-green-800 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProgram(null)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditingProgram(program)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Status Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Student Statuses</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              className="p-4 border-b border-gray-200 flex justify-between items-center"
            >
              <span>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagementSettings;
