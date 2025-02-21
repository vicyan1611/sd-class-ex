import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";

interface ProgramAttributes {
  program_id: string;
  program_name: string;
  description?: string;
  duration?: string;
  degree_type?: string;
}

class Program extends Model<ProgramAttributes> implements ProgramAttributes {
  public program_id!: string;
  public program_name!: string;
  public description!: string;
  public duration!: string;
  public degree_type!: string;
}

Program.init(
  {
    program_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    program_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    degree_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Program",
  },
);

Student.belongsTo(Program, { foreignKey: "program_id" });

export default Program;
