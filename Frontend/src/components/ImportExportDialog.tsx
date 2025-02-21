import { useState } from "react";
import { Student } from "../types";
import {
  exportToCSV,
  exportToJSON,
  importFromCSV,
  importFromJSON,
} from "../utils/dataUtils";

interface ImportExportDialogProps {
  students: Student[];
  onClose: () => void;
  onImportComplete: () => void;
}

const ImportExportDialog = ({
  students,
  onClose,
  onImportComplete,
}: ImportExportDialogProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (file.name.endsWith(".csv")) {
        await importFromCSV(file);
      } else if (file.name.endsWith(".json")) {
        await importFromJSON(file);
      } else {
        throw new Error("Unsupported file format");
      }
      onImportComplete();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Import/Export Data</h2>

        {error && (
          <div className="mb-4 text-red-500">
            Error: {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Export</h3>
            <div className="space-x-2">
              <button
                onClick={() => exportToCSV(students)}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Export to CSV
              </button>
              <button
                onClick={() => exportToJSON(students)}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                Export to JSON
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Import</h3>
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImportExportDialog;
