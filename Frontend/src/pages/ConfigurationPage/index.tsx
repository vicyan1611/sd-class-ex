import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../api/config";
import { useEffect } from "react";
const ConfigurationPage = () => {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });
  const [config, setConfig] = useState<{
    emailDomain: string;
    phonePattern: string;
  }>({ emailDomain: "", phonePattern: "" });
  const handleChange = (section: string, value: string) => {
    setConfig({ ...config, [section]: value });
  };

  const fetchConfig = async () => {
    try {
      const response = await axiosInstance.get("/configurations");
      setConfig(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSave = async () => {
    setSaveStatus({
      message: "Configuration saved successfully!",
      type: "success",
    });
    setTimeout(() => {
      setSaveStatus({ message: "", type: "" });
    }, 3000);
  };

  useEffect(() => {
    fetchConfig();
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
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};
export default ConfigurationPage;
