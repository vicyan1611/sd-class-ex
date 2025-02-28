export interface Student {
  id: number;
  student_id: string;
  faculty_id: number;
  full_name: string;
  date_of_birth: Date;
  gender: string;
  course_year: string;
  program_id: number;
  address: string;
  email: string;
  phone: string;
  status_id: number;
  Faculty?: Faculty;
  Program?: Program;
  Status?: Status;
}

export interface Faculty {
  id: number;
  faculty_name: string;
  description?: string;
  established_date?: Date;
  dean_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

export interface Program {
  id: number;
  program_name: string;
  description?: string;
  duration?: string;
  degree_type?: string;
}

export interface Status {
  id: number;
  status_name: string;
  description?: string;
}
