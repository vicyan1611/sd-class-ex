import { Student } from "../types";
interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
}

const StudentTable = ({ students, onEdit, onDelete }: StudentTableProps) => {
  return (
    <div className="overflow-x-auto min-w-full">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Faculty
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Full Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Date of Birth
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Course Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Program
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {students.map((student) => (
            <tr key={student.student_id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.student_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.Faculty?.faculty_name || student.facultyId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.full_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(student.date_of_birth).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{student.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.course_year}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.Program?.program_name || student.program_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{student.address}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{student.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {student.Status?.status_name || student.status_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onEdit(student)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(student)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
