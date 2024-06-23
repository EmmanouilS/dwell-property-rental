document.addEventListener("DOMContentLoaded", function () {
    const bookingForm = document.getElementById('bookingForm');
    const dateSelection = document.getElementById('dateSelection');
    const fullBookingForm = document.getElementById('fullBookingForm');
    const continueBtn = document.getElementById('continueBtn');
    const messageElement = document.getElementById('message');
    const totalPriceFormElement = document.getElementById('totalPriceForm');

    // Elements to display property details
    const propertyTitleElement = document.getElementById('propertyTitle');  
    const propertyRegionElement = document.getElementById('propertyRegion');
    const propertyRoomsElement = document.getElementById('propertyRooms');
    const propertyPriceElement = document.getElementById('propertyPrice');
    const listingIdElement = document.getElementById('listing_id');

    // Function to get query parameter by name
    function getParameterByName(name) {
        const url = new URL(window.location.href);
        return url.searchParams.get(name);
    }

    // Retrieve property details from URL
    const propertyId = getParameterByName('property_id');
    const propertyTitle = decodeURIComponent(getParameterByName('property_title'));
    const propertyRegion = decodeURIComponent(getParameterByName('property_region'));
    const propertyRooms = getParameterByName('property_rooms');
    const propertyPrice = parseFloat(getParameterByName('property_price'));

    // Display property details on the page
    propertyTitleElement.textContent = propertyTitle;
    propertyRegionElement.textContent = `Region: ${propertyRegion}`;
    propertyRoomsElement.textContent = `Rooms: ${propertyRooms}`;
    propertyPriceElement.textContent = `Price per Night: $${propertyPrice.toFixed(2)}`;

    // Set the listing ID in the hidden form field
    if (listingIdElement) {
        listingIdElement.value = propertyId;
    }

    // Prefill user information if available in cookies
    function getCookieValue(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    // Prefill form with user details from cookies
    if (document.getElementById('user_id')) {
        document.getElementById('user_id').value = getCookieValue('user_id');
    }
    if (document.getElementById('first_name')) {
        document.getElementById('first_name').value = getCookieValue('first_name');
    }
    if (document.getElementById('last_name')) {
        document.getElementById('last_name').value = getCookieValue('last_name');
    }
    if (document.getElementById('email')) {
        document.getElementById('email').value = getCookieValue('email');
    }

    // Function to check availability
    function checkAvailability(start_date, end_date) {
        return fetch('book.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'check_availability',
                listing_id: propertyId,
                start_date: start_date,
                end_date: end_date,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.available) {
                    // Show full booking form
                    dateSelection.style.display = 'none'; // Hide date selection form
                    fullBookingForm.style.display = 'block'; // Show full booking form

                    // Display total price received from the server
                    if (totalPriceFormElement && data.total_price) {
                        totalPriceFormElement.textContent = `Total Price: $${data.total_price}`;
                    }

                    // Set total price in hidden input field
                    if (document.getElementById('total_price')) {
                        document.getElementById('total_price').value = data.total_price; // Set total price in hidden input field
                    }
                } else {
                    alert('Property is not available for the selected dates. Please choose other dates.');
                }
            })
            .catch(error => {
                console.error('Error checking availability:', error);
                alert('An error occurred while checking availability. Please try again later.');
            });
    }

    // Event listener for continue button
    if (continueBtn) {
        continueBtn.addEventListener('click', function (event) {
            event.preventDefault();

            // Get selected dates
            const startDate = document.getElementById('start_date').value;
            const endDate = document.getElementById('end_date').value;

            // Check availability
            checkAvailability(startDate, endDate);
        });
    }

    // Event listener for full booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(bookingForm);

            fetch('book.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(`Booking successful!`);
                        window.location.href = 'feed.html';
                    } else {
                        messageElement.textContent = data.error || 'Failed to book the property.';
                    }
                })
                .catch(error => {
                    console.error('Error booking property:', error);
                    messageElement.textContent = 'An error occurred while booking. Please try again later.';
                });
        });
    }
});
