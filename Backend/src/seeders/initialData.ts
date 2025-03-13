import Faculty from "../models/Faculty";
import Student from "../models/Student";
import Program from "../models/Program";
import Status from "../models/Status";
import Configuration from "../models/Configuration";
import StatusTransition from "../models/StatusTransition";

const faculties = [
  {
    faculty_name: "Khoa Luật",
    description: "Đào tạo chuyên ngành Luật",
    established_date: new Date("2000-01-01"),
    dean_name: "Nguyễn Văn A",
    contact_email: "law@university.edu.vn",
    contact_phone: "0123456789",
  },
  {
    faculty_name: "Khoa Tiếng Anh thương mại",
    description: "Đào tạo chuyên ngành Tiếng Anh thương mại",
    established_date: new Date("2000-01-01"),
    dean_name: "Trần Thị B",
    contact_email: "english@university.edu.vn",
    contact_phone: "0123456790",
  },
  {
    faculty_name: "Khoa Tiếng Nhật",
    description: "Đào tạo chuyên ngành Tiếng Nhật",
    established_date: new Date("2000-01-01"),
    dean_name: "Lê Văn C",
    contact_email: "japanese@university.edu.vn",
    contact_phone: "0123456791",
  },
  {
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
    faculty_id: 1,
    full_name: "Nguyễn Văn X",
    date_of_birth: new Date("2002-05-15"),
    gender: "Nam",
    course_year: "2020",
    program_id: 1,
    address: "123 Đường ABC, Quận 1, TP.HCM",
    email: "vanx@student.edu.vn",
    phone: "0987654321",
    status_id: 1,
  },
  {
    student_id: "2020002",
    faculty_id: 2,
    full_name: "Trần Thị Y",
    date_of_birth: new Date("2002-06-20"),
    gender: "Nữ",
    course_year: "2020",
    program_id: 2,
    address: "456 Đường XYZ, Quận 2, TP.HCM",
    email: "thiy@student.edu.vn",
    phone: "0987654322",
    status_id: 1,
  },
  {
    student_id: "2019001",
    faculty_id: 3,
    full_name: "Lê Văn Z",
    date_of_birth: new Date("2001-03-10"),
    gender: "Nam",
    course_year: "2019",
    program_id: 3,
    address: "789 Đường DEF, Quận 3, TP.HCM",
    email: "vanz@student.edu.vn",
    phone: "0987654323",
    status_id: 2,
  },
  {
    student_id: "2021001",
    faculty_id: 4,
    full_name: "Phạm Thị W",
    date_of_birth: new Date("2003-12-25"),
    gender: "Nữ",
    course_year: "2021",
    program_id: 4,
    address: "101 Đường GHI, Quận 4, TP.HCM",
    email: "thiw@student.edu.vn",
    phone: "0987654324",
    status_id: 1,
  },
];

const programs = [
  {
    program_name: "Cử nhân Luật",
    description: "Chương trình đào tạo cử nhân Luật",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_name: "Cử nhân Tiếng Anh thương mại",
    description: "Chương trình đào tạo cử nhân Tiếng Anh thương mại",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_name: "Cử nhân Tiếng Nhật",
    description: "Chương trình đào tạo cử nhân Tiếng Nhật",
    duration: "4 years",
    degree_type: "Bachelor",
  },
  {
    program_name: "Cử nhân Tiếng Pháp",
    description: "Chương trình đào tạo cử nhân Tiếng Pháp",
    duration: "4 years",
    degree_type: "Bachelor",
  },
];

const statuses = [
  {
    status_name: "Đang học",
    description: "Sinh viên đang theo học",
  },
  {
    status_name: "Đã tốt nghiệp",
    description: "Sinh viên đã hoàn thành chương trình học",
  },
  {
    status_name: "Đã thôi học",
    description: "Sinh viên đã thôi học",
  },
  {
    status_name: "Tạm dừng học",
    description: "Sinh viên tạm dừng học tập",
  },
];

const configurations = [
  {
    emailDomain: "@student.university.edu.vn",
    phonePattern: /^(\+84|0)[1-9][0-9]{8}$/.source,
    studentDeletionTimeWindow: 30,
    rulesEnabled: true,
  },
];

const statusTransitions = [
  {
    from_status_id: 1,
    to_status_id: 2,
  },
  {
    from_status_id: 1,
    to_status_id: 3,
  },
  {
    from_status_id: 1,
    to_status_id: 4,
  },
  {
    from_status_id: 4,
    to_status_id: 1,
  },
];

export const initializeData = async () => {
  try {
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

    const studentCount = await Student.count();
    if (studentCount === 0) {
      console.log("Initializing students data...");
      await Student.bulkCreate(students);
      console.log("Students data initialized successfully!");
    }

    const configuationCount = await Configuration.count();
    if (configuationCount === 0) {
      console.log("Initializing configuration data...");
      await Configuration.bulkCreate(configurations);
    }

    const statusTransitionCount = await StatusTransition.count();
    if (statusTransitionCount === 0) {
      console.log("Initializing status transitions data...");
      await StatusTransition.bulkCreate(statusTransitions);
    }
  } catch (error) {
    console.error("Error initializing data:", error);
  }
};
