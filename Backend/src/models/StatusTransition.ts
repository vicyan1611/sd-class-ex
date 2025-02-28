import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Status from "./Status";

interface StatusTransitionAttributes {
  id?: number;
  from_status_id: number;
  to_status_id: number;
}

class StatusTransition
  extends Model<StatusTransitionAttributes>
  implements StatusTransitionAttributes
{
  public id!: number;
  public from_status_id!: number;
  public to_status_id!: number;
}

StatusTransition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    from_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    to_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StatusTransition",
  },
);
StatusTransition.belongsTo(Status, {
  foreignKey: "from_status_id",
  as: "from_status",
});
StatusTransition.belongsTo(Status, {
  foreignKey: "to_status_id",
  as: "to_status",
});
export default StatusTransition;
