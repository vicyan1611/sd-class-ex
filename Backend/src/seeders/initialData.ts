import Faculty from "../models/Faculty";
import Student from "../models/Student";
import Program from "../models/Program";
import Status from "../models/Status";
const faculties = [
  {
    faculty_id: "LAW",
    faculty_name: "Khoa Luật",
    description: "Đào tạo chuyên ngành Luật",
    established_date: new Date("2000-01-01"),
    dean_name: "Nguyễn Văn A",
    contact_email: "law@university.edu.vn",
    contact_phone: "0123456789",
  },
  {
    faculty_id: "ENG",
    faculty_name: "Khoa Tiếng Anh thương mại",
    description: "Đào tạo chuyên ngành Tiếng Anh thương mại",
    established_date: new Date("2000-01-01"),
    dean_name: "Trần Thị B",
    contact_email: "english@university.edu.vn",
    contact_phone: "0123456790",
  },
  {
    faculty_id: "JAP",
    faculty_name: "Khoa Tiếng Nhật",
    description: "Đào tạo chuyên ngành Tiếng Nhật",
    established_date: new Date("2000-01-01"),
    dean_name: "Lê Văn C",
    contact_email: "japanese@university.edu.vn",
    contact_phone: "0123456791",
  },
  {
    faculty_id: "FRE",
    faculty_name: "Khoa Tiếng Pháp",
    description: "Đào tạo chuyên ngành Tiếng Pháp",
    established_date: new Date("2000-01-01"),
    dean_name: "Phạm Thị D",
    contact_email: "french@university.edu.vn",
    contact_phone: "0123456792",
  },
];

const students = [
  {
    student_id: "2020001",
    facultyId: "LAW",
    full_name: "Nguyễn Văn X",
    date_of_birth: new Date("2002-05-15"),
    gender: "Nam",
    course_year: "2020",
    program: "LAW_LLB",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    email: "vanx@student.edu.vn",
    phone: "0987654321",
    student_status: "active",
  },
  {
    student_id: "2020002",
    facultyId: "ENG",
    full_name: "Trần Thị Y",
    date_of_birth: new Date("2002-06-20"),
    gender: "Nữ",
    course_year: "2020",
    program: "ENG_BA",
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    email: "thiy@student.edu.vn",
    phone: "0987654322",
    student_status: "active",
  },
  {
    student_id: "2019001",
    facultyId: "JAP",
    full_name: "Lê Văn Z",
    date_of_birth: new Date("2001-03-10"),
    gender: "Nam",
    course_year: "2019",
    program: "JAP_BA",
    address: "789 Đường DEF, Quận 3, TP.HCM",
    email: "vanz@student.edu.vn",
    phone: "0987654323",
    student_status: "graduated",
  },
  {
    student_id: "2021001",
    facultyId: "FRE",
    full_name: "Phạm Thị W",
    date_of_birth: new Date("2003-12-25"),
    gender: "Nữ",
    course_year: "2021",
    program: "FRE_BA",
    address: "101 Đường GHI, Quận 4, TP.HCM",
    email: "thiw@student.edu.vn",
    phone: "0987654324",
    student_status: "active",
  },
];

const programs = [
  {
    program_id: "LAW_LLB",
    program_name: "Cử nhân Luật",
    description: "Chương trình đào tạo cử nhân Luật",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_id: "ENG_BA",
    program_name: "Cử nhân Tiếng Anh thương mại",
    description: "Chương trình đào tạo cử nhân Tiếng Anh thương mại",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_id: "JAP_BA",
    program_name: "Cử nhân Tiếng Nhật",
    description: "Chương trình đào tạo cử nhân Tiếng Nhật",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_id: "FRE_BA",
    program_name: "Cử nhân Tiếng Pháp",
    description: "Chương trình đào tạo cử nhân Tiếng Pháp",
    duration: "4 years",
    degree_type: "Bachelor",
  },
];

const statuses = [
  {
    status_id: "active",
    status_name: "Đang học",
    description: "Sinh viên đang theo học",
  },
  {
    status_id: "graduated",
    status_name: "Đã tốt nghiệp",
    description: "Sinh viên đã hoàn thành chương trình học",
  },
  {
    status_id: "dropout",
    status_name: "Đã thôi học",
    description: "Sinh viên đã thôi học",
  },
  {
    status_id: "suspended",
    status_name: "Tạm dừng học",
    description: "Sinh viên tạm dừng học tập",
  },
];

export const initializeData = async () => {
  try {
    // Check if faculties table is empty
    const facultyCount = await Faculty.count();
    if (facultyCount === 0) {
      console.log("Initializing faculties data...");
      await Faculty.bulkCreate(faculties);
      console.log("Faculties data initialized successfully!");
    }

    const programCount = await Program.count();
    if (programCount === 0) {
      console.log("Initializing programs data...");
      await Program.bulkCreate(programs);
      console.log("Programs data initialized successfully!");
    }

    const statusCount = await Status.count();
    if (statusCount === 0) {
      console.log("Initializing statuses data...");
      await Status.bulkCreate(statuses);
      console.log("Statuses data initialized successfully!");
    }

    // Check if students table is empty
    const studentCount = await Student.count();
    if (studentCount === 0) {
      console.log("Initializing students data...");
      await Student.bulkCreate(students);
      console.log("Students data initialized successfully!");
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};
