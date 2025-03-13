import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/config";
import { StatusTransition } from "../../types";

const ConfigurationPage = () => {
  const navigate = useNavigate();
  const [statusTransitions, setStatusTransitions] = useState<
    StatusTransition[]
  >([]);
  const [newfromStatus, setNewfromStatus] = useState("");
  const [newtoStatus, setNewtoStatus] = useState("");

  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });
  const [config, setConfig] = useState<{
    id: number;
    emailDomain: string;
    phonePattern: string;
    studentDeletionTimeWindow: number;
    rulesEnabled: boolean;
  }>({
    id: 0,
    emailDomain: "",
    phonePattern: "",
    studentDeletionTimeWindow: 0,
    rulesEnabled: false,
  });

  const handleChange = (section: string, value: string | boolean | number) => {
    setConfig({ ...config, [section]: value });
  };

  const fetchConfig = async () => {
    try {
      const response = await axiosInstance.get("/configurations");
      setConfig(response.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchStatusTransitions = async () => {
    try {
      const response = await axiosInstance.get("/status-transitions");
      setStatusTransitions(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSave = async () => {
    try {
      await axiosInstance.put(`/configurations/${config.id}`, config);
      setSaveStatus({ message: "Configuration saved", type: "success" });
    } catch (err) {
      console.log(err);
      setSaveStatus({
        message: "Failed to save configurati$on",
        type: "error",
      });
      setTimeout(() => {
        setSaveStatus({ message: "", type: "" });
      }, 3000);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/status-transitions/${id}`);
      fetchStatusTransitions();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddTransition = async () => {
    if (!newfromStatus.trim()) return;
    if (!newtoStatus.trim()) return;
    try {
      await axiosInstance.post("/status-transitions", {
        from_status_id: parseInt(newfromStatus),
        to_status_id: parseInt(newtoStatus),
      });
      fetchStatusTransitions();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchStatusTransitions();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Validation Configuration</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Back
        </button>
      </div>
      {saveStatus.message && (
        <div
          className={`p-4 mb-4 rounded ${
            saveStatus.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {saveStatus.message}
        </div>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Email Validation</h2>
        <label className="block mb-2">Allowed Domains (comma-separated)</label>
        <input
          type="text"
          value={config.emailDomain}
          onChange={(e) => handleChange("emailDomain", e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-sm text-gray-500 mt-1">
          Example: @student.university.edu.vn, @faculty.university.edu.vn
        </p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Phone Validation</h2>
        <label className="block mb-2">Phone Number Pattern (RegEx)</label>
        <input
          type="text"
          value={config.phonePattern}
          onChange={(e) => handleChange("phonePattern", e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-sm text-gray-500 mt-1">
          Example: /^(\+84|0)[1-9][0-9]{8}$/
        </p>
      </div>

      {/* Deletion Time Window */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Student Deletion Time Window
        </h2>
        <label className="block mb-2">Time Window (minutes)</label>
        <input
          type="number"
          min="1"
          value={config.studentDeletionTimeWindow}
          onChange={(e) =>
            handleChange("studentDeletionTimeWindow", parseInt(e.target.value))
          }
          className="w-full px-3 py-2 border rounded"
        />
        <p className="text-sm text-gray-500 mt-1">
          Students can only be deleted within this time window after creation.
        </p>
      </div>

      {/* Business Rules Toggle */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Business Rules Enforcement
        </h2>
        <div className="flex items-center mb-4">
          <label className="inline-flex items-center cursor-pointer mr-4">
            <input
              type="checkbox"
              checked={config.rulesEnabled}
              onChange={(e) => handleChange("rulesEnabled", e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {config.rulesEnabled ? "Enabled" : "Disabled"}
            </span>
          </label>
        </div>
        <p className="text-sm text-gray-500">
          When disabled, business rules validation will be skipped, allowing
          operations that would otherwise be restricted.
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Save Configuration
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Status Transition</h2>
        <label className="block mb-2">Add Transition</label>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newfromStatus}
            onChange={(e) => setNewfromStatus(e.target.value)}
            placeholder="Transition ID"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newtoStatus}
            onChange={(e) => setNewtoStatus(e.target.value)}
            placeholder="Transition ID"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTransition}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Transition
          </button>
        </div>
        <label className="block mb-2">Current Transitions</label>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {statusTransitions.map((transition) => (
            <div
              className="p-4 border-b border-gray-200 flex justify-between items-center"
              key={transition.id}
            >
              <span>
                {transition.from_status?.status_name} to{" "}
                {transition.to_status?.status_name}
              </span>
              <button
                onClick={() => handleDelete(transition.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ConfigurationPage;
