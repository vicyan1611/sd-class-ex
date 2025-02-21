import { Student } from "../types";

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
      program_id: formData.get("program_id") as string,
      status_id: formData.get("status_id") as string,
      date_of_birth: new Date(formData.get("date_of_birth") as string),
      gender: formData.get("gender") as string,
      course_year: formData.get("course_year") as string,
      address: formData.get("address") as string,
      phone: formData.get("phone") as string,
      facultyId: formData.get("facultyId") as string,
    };
    onSubmit(studentData);
  };
  console.log(student.date_of_birth);
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-3xl 2xl:w-5xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isEdit && (
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
          )}
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
            <label className="block mb-2">Faculty ID</label>
            <input
              type="text"
              name="facultyId"
              defaultValue={student.facultyId}
              className="w-full px-3 py-2 border rounded"
              required
            />
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
            <label className="block mb-2">Program ID</label>
            <input
              type="text"
              name="program_id"
              defaultValue={student.program_id}
              className="w-full px-3 py-2 border rounded"
              required
            />
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
              <option value="Đang học">Đang học</option>
              <option value="Đã tốt nghiệp">Đã tốt nghiệp</option>
              <option value="Đã thôi học">Đã thôi học</option>
              <option value="Tạm dừng học">Tạm dừng học</option>
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
