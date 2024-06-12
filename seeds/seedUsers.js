// const sequelize = require("../config/connection");
const { User } = require("../models");

const userData = require("./usersData.json");

const seedUsers = async () => {
  try {
    // await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Users seeded");
  } catch (error) {
    console.error("Failed to seed users:", error);
  }
};

module.exports = seedUsers;
