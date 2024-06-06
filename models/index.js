const User = require('./User');
const Dog = require('./dog');
const MealLog = require('./mealLog');

User.hasMany(Dog, {
    foreignKey: 'user_id',
});
  
Dog.belongsTo(User, {
    foreignKey: 'user_id',
});

Dog.hasMany(MealLog, {
    foreignKey: 'dog_id',
});
  
MealLog.belongsTo(Dog, {
    foreignKey: 'dog_id',
});

module.exports = { User, Dog, MealLog };