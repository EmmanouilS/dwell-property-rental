document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var formData = new FormData(this);
            formData.append('action', 'login');

            fetch('login-reg.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    if (data.trim() === 'success') {
                        window.location.href = 'feed.html'; // Redirect to feed page after successful login
                    } else {
                        alert(data); // Show error message if login fails
                    }
                });
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var formData = new FormData(this);
            formData.append('action', 'register');

            fetch('login-reg.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    if (data.trim() === 'Registration successful') {
                        alert('Registration successful! Please login.'); // Show success message
                        window.location.href = 'login.html'; // Redirect to login page
                    } else {
                        alert(data); // Show error message if registration fails
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.'); // Show generic error message
                });
        });
    }

    const showRegisterFormLink = document.getElementById('show-register-form');
    if (showRegisterFormLink) {
        showRegisterFormLink.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('login-form-container').style.display = 'none';
            document.getElementById('register-form-container').style.display = 'block';
        });
    }

    const showLoginFormLink = document.getElementById('show-login-form');
    if (showLoginFormLink) {
        showLoginFormLink.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById('register-form-container').style.display = 'none';
            document.getElementById('login-form-container').style.display = 'block';
        });
    }
});
