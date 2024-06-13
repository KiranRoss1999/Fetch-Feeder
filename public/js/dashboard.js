// async function viewMeals(dogId) {
//     const response = await fetch(`/api/meals/${dogId}`);
//     const meals = await response.json();
//     const mealsSection = document.getElementById('meals-section');
//     mealsSection.innerHTML = ''; // Clear previous meals
//     meals.forEach(meal => {
//       const mealDiv = document.createElement('div');
//       mealDiv.className = 'meal-log';
//       mealDiv.innerHTML = `
//         <p>Meal: ${meal.meal_name}</p>
//         <p>Quantity: ${meal.quantity}</p>
//         <p>Time: ${new Date(meal.time).toLocaleString()}</p>
//       `;
//       mealsSection.appendChild(mealDiv);
//     });
//   }
  
//   function addMeal(dogId) {
//     // Implement the function to add a meal
//   }