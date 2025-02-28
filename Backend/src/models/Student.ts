import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Program from "./Program";
import Status from "./Status";
import Faculty from "./Faculty";
interface StudentAttributes {
  id?: number;
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
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public id!: number;
  public student_id!: string;
  public faculty_id!: number;
  public full_name!: string;
  public date_of_birth!: Date;
  public gender!: string;
  public course_year!: string;
  public program_id!: number;
  public address!: string;
  public email!: string;
  public phone!: string;
  public status_id!: number;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty_id: {
      type: DataTypes.INTEGER,
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
    program_id: {
      type: DataTypes.INTEGER,
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
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Student",
  },
);
Student.belongsTo(Status, { foreignKey: "status_id" });
Student.belongsTo(Program, { foreignKey: "program_id" });
Student.belongsTo(Faculty, { foreignKey: "faculty_id" });

export default Student;
