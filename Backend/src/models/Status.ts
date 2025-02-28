import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface StatusAttributes {
  id?: number;
  status_name: string;
  description?: string;
}

class Status extends Model<StatusAttributes> implements StatusAttributes {
  public id!: number;
  public status_name!: string;
  public description!: string;
}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Status",
  },
);

export default Status;
