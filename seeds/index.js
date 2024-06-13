const sequelize = require("../config/connection");
const seedUsers = require("./seedUsers");
const seedDogs = require("./seedDogs");
const seedMeals = require("./seedMeals");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedDogs();
    await seedMeals();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Failed to seed database:", error);
  } finally {
    process.exit(0);
  }
};

seedAll();