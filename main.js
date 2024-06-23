document.addEventListener("DOMContentLoaded", function () {
    const authLink = document.getElementById("auth-link");
    const navLinks = document.querySelector(".nav-links");
    const burger = document.createElement("div");

    burger.classList.add("burger");
    burger.innerHTML = `<div></div><div></div><div></div>`;
    document.querySelector(".navbar .container").appendChild(burger);

    burger.addEventListener("click", () => {
        navLinks.classList.toggle("nav-active");
    });

    // Function to check user authentication status
    function checkAuthStatus() {
        const username = getCookie('username');

        if (username) {
            authLink.innerHTML = `<a href="#" id="logout-link">${username} (Logout)</a>`;
            document.getElementById('logout-link').addEventListener('click', function (event) {
                event.preventDefault();
                // Clear username cookie
                document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                window.location.reload();
            });
            return true; // User is logged in
        } else {
            authLink.innerHTML = '<a href="login.html">Login</a>';
            // Check if current page is create listing or book page
            const currentPage = window.location.pathname;
            if (currentPage.includes('create_listing.html') || currentPage.includes('book.html')) {
                alert('You need to login first.');
                window.location.href = 'login.html';
            }
            return false; // User is not logged in
        }
    }

    // Function to get cookie value by name
    function getCookie(name) {
        const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
        return cookieValue ? cookieValue.pop() : null;
    }

    // Call the function to check authentication status
    const isLoggedIn = checkAuthStatus();
    window.isLoggedIn = isLoggedIn; // Make isLoggedIn available globally
});
