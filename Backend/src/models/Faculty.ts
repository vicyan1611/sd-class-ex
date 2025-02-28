import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface FacultyAttributes {
  id?: number;
  faculty_name: string;
  description?: string;
  established_date?: Date;
  dean_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

class Faculty extends Model<FacultyAttributes> implements FacultyAttributes {
  public id!: number;
  public faculty_name!: string;
  public description!: string;
  public established_date!: Date;
  public dean_name!: string;
  public contact_email!: string;
  public contact_phone!: string;
}

Faculty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    faculty_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    established_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dean_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    contact_phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Faculty",
  },
);

export default Faculty;
