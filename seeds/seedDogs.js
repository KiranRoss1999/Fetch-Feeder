// const sequelize = require("../config/connection");
const { Dog } = require("../models");

const dogsData = require("./dogsData.json");

const seedDogs = async () => {
  try {
    // await sequelize.sync({ force: true });
    await Dog.bulkCreate(dogsData, {
      individualHooks: true,
      returning: true,
    });
    console.log("Dogs seeded");
  } catch (error) {
    console.error("Failed to seed Dogs:", error);
  }
};

module.exports = seedDogs;
