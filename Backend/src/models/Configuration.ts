import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ConfigurationAttributes {
  id?: number;
  emailDomain: string;
  phonePattern: string;
  studentDeletionTimeWindow: number;
  rulesEnabled: boolean;
}

class Configuration
  extends Model<ConfigurationAttributes>
  implements ConfigurationAttributes
{
  public id!: number;
  public emailDomain!: string;
  public phonePattern!: string;
  public studentDeletionTimeWindow!: number;
  public rulesEnabled!: boolean;
}

Configuration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    emailDomain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonePattern: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentDeletionTimeWindow: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rulesEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Configuration",
  },
);

export default Configuration;
