const AboutDialogue = ({ onClose }: { onClose: () => void }) => {
  const buildDate = "2025-02-21";
  const version = "2.0.0"; // You can make this dynamic if needed

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3xl 2xl:w-5xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          About Student Management System
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Version Information</h3>
            <p className="mt-2">Current Version: {version}</p>
            <p>Build Date: {buildDate}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Features</h3>
            <ul className="list-disc ml-6 mt-2">
              <li>Student Management (Add, Edit, Delete)</li>
              <li>Advanced Search Functionality</li>
              <li>Data Import/Export (CSV, JSON)</li>
              <li>Faculty Management</li>
              <li>Student Status Tracking</li>
              <li>Program Management</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">System Information</h3>
            <p className="mt-2">
              This student management system is designed to help educational
              institutions manage student records efficiently and effectively.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Support</h3>
            <p className="mt-2">
              For support inquiries, please contact the system administrator or
              refer to the documentation.
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutDialogue;
