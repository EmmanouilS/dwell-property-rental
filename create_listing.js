document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('create-listing-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Check if user is logged in
        if (!window.isLoggedIn) {
            alert("You need to sign in to create a listing.");
            window.location.href = 'login-reg.html'; // Redirect to login page
            return;
        }

        // Client-side validation
        const title = document.getElementById('title').value;
        const region = document.getElementById('region').value;
        const rooms = document.getElementById('rooms').value;
        const price = document.getElementById('price').value;
        const photo = document.getElementById('photo').files[0];

        if (!/^[a-zA-Z\s]+$/.test(title)) {
            alert("Title must contain only characters.");
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(region)) {
            alert("Region must contain only characters.");
            return;
        }

        if (!Number.isInteger(Number(rooms)) || Number(rooms) <= 0) {
            alert("Number of rooms must be a whole number greater than 0.");
            return;
        }

        if (!Number.isInteger(Number(price)) || Number(price) <= 0) {
            alert("Price per night must be a whole number greater than 0.");
            return;
        }

        // Create FormData to send the data via POST request
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('title', title);
        formData.append('region', region);
        formData.append('rooms', rooms);
        formData.append('price', price);

        fetch('create_listing.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Listing created successfully! Redirecting to feed...");
                    window.location.href = 'feed.html';
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error creating listing:", error);
            alert("An error occurred while creating the listing. Please try again later.");
        });
    });
});
