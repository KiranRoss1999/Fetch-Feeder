const deleteMeal = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this meal?');
    
    if (confirmed) {
      try {

        const accessToken = JSON.parse(sessionStorage.getItem('accessToken'));
        const response = await fetch(`/api/meals/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json',
          "authorization": `Bearer ${accessToken}`
        },
        });
  
        if (response.ok) {
          document.getElementById(`meal-${id}`).remove();
          alert('Meal deleted successfully');
        } else {
          alert('Failed to delete meal');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    }
  }

  document.querySelectorAll('.delete-meal-button').forEach((button) => {
    button.addEventListener('click', async (event) => {
      const mealId = event.target.getAttribute('data-id');
      await deleteMeal(mealId);
    });
  });