export interface Student {
  student_id: string;
  facultyId: string;
  full_name: string;
  date_of_birth: Date;
  gender: string;
  course_year: string;
  program_id: string;
  address: string;
  email: string;
  phone: string;
  status_id: string;
  Faculty?: Faculty;
  Program?: Program;
  Status?: Status;
}

export interface Faculty {
  faculty_id: string;
  faculty_name: string;
  description?: string;
  established_date?: Date;
  dean_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface Program {
  program_id: string;
  program_name: string;
  description?: string;
  duration?: string;
  degree_type?: string;
}

export interface Status {
  status_id: string;
  status_name: string;
  description?: string;
}
