import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Program from "./Program";
import Status from "./Status";
import Faculty from "./Faculty";
interface StudentAttributes {
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
}

class Student extends Model<StudentAttributes> implements StudentAttributes {
  public student_id!: string;
  public facultyId!: string;
  public full_name!: string;
  public date_of_birth!: Date;
  public gender!: string;
  public course_year!: string;
  public program_id!: string;
  public address!: string;
  public email!: string;
  public phone!: string;
  public status_id!: string;
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
    program_id: {
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
    status_id: {
      type: DataTypes.STRING,
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
Student.belongsTo(Faculty, { foreignKey: "facultyId" });

export default Student;
