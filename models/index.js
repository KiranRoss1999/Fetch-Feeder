const User = require("./User");
const Dog = require("./Dog");
const MealLog = require("./MealLog");
const WeightLog = require("./weightLog")

User.hasMany(Dog, {
  // as: 'dogs',
  foreignKey: "user_id",
});

// Each Dog belongs to a User
Dog.belongsTo(User, {
  // as: 'owner',
  foreignKey: "user_id",
});

// Dog can have many MealLogs
Dog.hasMany(MealLog, {
  // as: 'mealLogs',
  foreignKey: "dog_id",
});

// Each MealLog belongs to a Dog
MealLog.belongsTo(Dog, {
  // as: 'dog',
  foreignKey: "dog_id",
});

Dog.hasMany(WeightLog, {
  foreignKey: "dog_id",
});

WeightLog.belongsTo(Dog, {
  // as: 'dog',
  foreignKey: "dog_id",
});

module.exports = { User, Dog, MealLog, WeightLog };
