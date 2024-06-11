const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        // Experimental code to validate unique, I want to test it before going implementing Evrett Godfery
        // async isUnique(value, next) {
        //   try {
        //     const user = await User.findOne({
        //       where: {
        //         email: value,
        //         id: { [Op.ne]: this.id } // Exclude current user in case of update
        //       }
        //     });
        //     if (user) {
        //       return next('Email address already in use!');
        //     }
        //     next();
        //   } catch (error) {
        //     next(error);
        //   }
        // }
      },
    },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          newUserData.email = newUserData.email.toLowerCase();
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          if (updatedUserData.changed('password')) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          }
          updatedUserData.email = updatedUserData.email.toLowerCase();
          return updatedUserData;
        }, 
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  module.exports = User;