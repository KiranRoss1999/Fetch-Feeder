const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
  try {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();

    if (response.ok) {
      sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken));
      document.location.replace('/dashboard');
    } else {
      alert('Login or password is incorrect. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
} else {
  alert('Please fill in both fields.');
}
};  


document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);