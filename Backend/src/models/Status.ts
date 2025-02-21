import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Student from "./Student";
interface StatusAttributes {
  status_id: string;
  status_name: string;
  description?: string;
}

class Status extends Model<StatusAttributes> implements StatusAttributes {
  public status_id!: string;
  public status_name!: string;
  public description!: string;
}

Status.init(
  {
    status_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
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

Student.belongsTo(Status, { foreignKey: "status_id" });

export default Status;
