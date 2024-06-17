const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class WeightLog extends Model {}

WeightLog.init({
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
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // default value for new records
  },
},
{
  sequelize,
  modelName: 'weight_log',
  freezeTableName: true,
  underscored: true,
  timestamps: true, // Enable automatic timestamps
  createdAt: 'created_at', // Customize the createdAt field name
});

module.exports = WeightLog;