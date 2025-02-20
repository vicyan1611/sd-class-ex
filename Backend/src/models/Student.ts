import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface StudentAttributes {
  student_id: string;
  facultyId: string;
  full_name: string;
  date_of_birth: Date;
  gender: string;
  course_year: string;
  program: string;
  address: string;
  email: string;
  phone: string;
  student_status: string;
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public student_id!: string;
  public facultyId!: string;
  public full_name!: string;
  public date_of_birth!: Date;
  public gender!: string;
  public course_year!: string;
  public program!: string;
  public address!: string;
  public email!: string;
  public phone!: string;
  public student_status!: string;
}

Student.init(
  {
    student_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    facultyId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    course_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Student",
  },
);

export default Student;
