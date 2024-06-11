const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class MealLog extends Model {}

MealLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    food: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calorie: {
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
    modelName: "mealLog",
  }
);

module.exports = MealLog;
