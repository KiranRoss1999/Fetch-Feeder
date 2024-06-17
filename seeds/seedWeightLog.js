const { WeightLog } = require("../models");

const weightLogData = require("./weightLogData.json");

const weightLog = async () => {
  try {
    // await sequelize.sync({ force: true });
    await WeightLog.bulkCreate(weightLogData, {
      individualHooks: true,
      returning: true,
    });
    console.log("weightLogs seeded");
  } catch (error) {
    console.error("Failed to seed weightLog:", error);
  }
};

module.exports = weightLog;