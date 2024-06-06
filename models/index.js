const User = require('./User');
const Dog = require('./Dog');
const MealLog = require('./MealLog');

User.hasMany(Dog, {
    as: 'dogs', 
    foreignKey: 'user_id',
});

// Each Dog belongs to a User
Dog.belongsTo(User, {
    as: 'owner',
    foreignKey: 'user_id',
});

// Dog can have many MealLogs
Dog.hasMany(MealLog, {
    as: 'mealLogs', 
    foreignKey: 'dog_id',
});

// Each MealLog belongs to a Dog
MealLog.belongsTo(Dog, {
    as: 'dog',
    foreignKey: 'dog_id',
});

module.exports = { User, Dog, MealLog };
