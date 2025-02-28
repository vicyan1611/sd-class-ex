import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ProgramAttributes {
  id?: number;
  program_name: string;
  description?: string;
  duration?: string;
  degree_type?: string;
}

class Program extends Model<ProgramAttributes> implements ProgramAttributes {
  public id!: number;
  public program_name!: string;
  public description!: string;
  public duration!: string;
  public degree_type!: string;
}

Program.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

export default Program;
