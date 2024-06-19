//function to listen and log a meal to the dog database

const logMealFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the new dog form
  const dog_id = window.location.pathname.split('/').pop();
  const food = document.querySelector('#food').value.trim();
  const calorie = document.querySelector('#calorie').value.trim();

  console.log({ food, calorie, dog_id });
//   const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))

  if (food && calorie) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/meals', {
          method: 'POST',
          body: JSON.stringify({ food, calorie, dog_id }),
          headers: { 'Content-Type': 'application/json'
            //  "authorization": `Bearer ${accessToken}`
           },
      });

      if (response.ok) {
          // If successful, redirect the browser to the Dashboard page
          document.location.replace(`/dog/${dog_id}`);
      } else {
          alert("failed to add meal");
      } 
      } else {
          console.error('Validation Error: All fields are required.');
      }

}

document
  .querySelector('#logMeal-form')
  .addEventListener('submit', logMealFormHandler);