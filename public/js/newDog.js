//function to listen and add a new dog to the database

const newDogFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the new dog form
    const name = document.querySelector('#name').value.trim();
    const weight = document.querySelector('#weight').value.trim();
    const calorie_target = document.querySelector('#calorie_target').value.trim();

    console.log({ name, weight, calorie_target });
    const accessToken = JSON.parse(sessionStorage.getItem('accessToken'))
    if (name && weight && calorie_target) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/dogs', {
            method: 'POST',
            body: JSON.stringify({ name, weight, calorie_target }),
            headers: { 'Content-Type': 'application/json',
               "authorization": `Bearer ${accessToken}`
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
    .querySelector('#newDog-form')
    .addEventListener('submit', newDogFormHandler);