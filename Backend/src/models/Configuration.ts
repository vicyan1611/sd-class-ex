import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface ConfigurationAttributes {
  id?: number;
  emailDomain: string;
  phonePattern: string;
}

class Configuration
  extends Model<ConfigurationAttributes>
  implements ConfigurationAttributes
{
  public id!: number;
  public emailDomain!: string;
  public phonePattern!: string;
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
  },
  {
    sequelize,
    modelName: "Configuration",
  },
);

export default Configuration;
