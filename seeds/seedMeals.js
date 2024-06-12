// const sequelize = require("../config/connection");
const { MealLog } = require("../models");

const mealsData = require("./mealsData.json");

const seedMeals = async () => {
  try {
    // await sequelize.sync({ force: true });
    await MealLog.bulkCreate(mealsData, {
      individualHooks: true,
      returning: true,
    });
    console.log("MealLogs seeded");
  } catch (error) {
    console.error("Failed to seed meal logs:", error);
  }
};

module.exports = seedMeals;
