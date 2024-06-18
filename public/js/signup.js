const signupFormHandler = async (event) => {
    event.preventDefault();
    // Collect values from the signup form
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    if (name && email && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },

    }).then((response)=> response.json())
    .then(data => {
      console.log(data)
        if (data) {
          sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken))
       document.location.replace('/dashboard');
    } else {
      alert(response?.statusText);
    } 
    }).catch(error => console.log(error))
  }
};
document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);