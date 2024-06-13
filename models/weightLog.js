const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class WeightLog extends Model {}

WeightLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "dog",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "weightLog",
  }
);

module.exports = WeightLog;