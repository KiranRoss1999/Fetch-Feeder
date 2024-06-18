//function to listen and update an existing dog to the database

const updateDogFormHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value.trim();
    const weight = document.querySelector('#weight').value.trim();
    const calorie_target = document.querySelector('#calorie_target').value.trim();

    // Get dog id from the form or URL
    const dog_id = window.location.pathname.split('/').pop();

    // Log the collected values
    console.log({ name: name, weight: weight, calorie_target: calorie_target });

    // const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
    if (name && weight && calorie_target) {
        // Send a PUT request to the API endpoint
        const response = await fetch(`/api/dogs/${dog_id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, weight, calorie_target }),
            headers: { 'Content-Type': 'application/json'
            //    "authorization": `Bearer ${accessToken}`
             },
        });

        console.log('Response:', response);

        if (response.ok) {
            // If successful, redirect the browser to the Dashboard page
            document.location.replace('/dashboard');
        } else {
            const errorText = await response.text();
            console.error('Error:', response.statusText, errorText);
            alert(response.statusText);
        } 
        } else {
            console.error('Validation Error: All fields are required.');
        }

}

document
    .querySelector('#updateDog-form')
    .addEventListener('submit', updateDogFormHandler);