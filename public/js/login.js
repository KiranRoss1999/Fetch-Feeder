const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
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
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);