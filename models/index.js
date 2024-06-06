const User = require('./User');
const Dog = require('./Dog');
const MealLog = require('./MealLog');

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
