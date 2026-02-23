document.addEventListener("DOMContentLoaded", function () {
    // bail out if authentication check hasn't run yet
    if (typeof window.isLoggedIn === 'undefined') return;

    const propertiesContainer = document.querySelector(".properties");

    // Immediately warn when the page is opened via file://
    if (window.location.protocol === 'file:') {
        console.error('feed.html is being opened with file:// protocol, fetch requests will fail.');
        propertiesContainer.innerHTML =
            "<p>Please serve this page over HTTP (e.g. using localhost) so that the PHP backend can be reached.</p>";
        return;
    }

    // Fetch properties from the server
    const apiUrl = 'feed.php?action=fetch_properties';
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                // non-2xx status codes will be treated as an error
                throw new Error(`Server returned ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(properties => {
            // server may return an error payload instead of an array
            if (properties && typeof properties === 'object' && properties.error) {
                console.error('Server reported error:', properties.error);
                propertiesContainer.innerHTML = `<p>Server error: ${properties.error}</p>`;
                return;
            }

            if (!Array.isArray(properties) || properties.length === 0) {
                propertiesContainer.innerHTML = "<p>No properties found.</p>";
                return;
            }

            properties.forEach(property => {
                renderProperty(property, propertiesContainer, window.isLoggedIn); // Use global isLoggedIn
            });
        })
        .catch(error => {
            console.error("Error fetching properties:", error);
            propertiesContainer.innerHTML = "<p>Failed to fetch properties. Please make sure your local server is running, your database credentials are correct, and the feed.php endpoint is accessible.</p>";
        });
});

// Function to render a property element
function renderProperty(property, container, isLoggedIn) {
    const propertyElement = document.createElement("div");
    propertyElement.classList.add("property");

    propertyElement.innerHTML = `
        <img src="${property.image_path}" alt="${property.title}">
        <h3>${property.title}</h3>
        <p><strong>Area:</strong> ${property.region}</p>
        <p><strong>Rooms:</strong> ${property.rooms}</p>
        <p><strong>Price per night:</strong> ${property.price}</p>
        <button class="reserve-btn" ${isLoggedIn ? '' : 'disabled'} data-property-id="${property.id}">Reserve Property</button>
    `;

    container.appendChild(propertyElement);

    // Add event listener for the reserve button
    if (isLoggedIn) {
        propertyElement.querySelector(".reserve-btn").addEventListener("click", function () {
            const propertyId = this.dataset.propertyId;
            const propertyTitle = property.title;
            const propertyRegion = property.region;
            const propertyRooms = property.rooms;
            const propertyPrice = property.price;
            const propertyImage = property.image_path;


            // Redirect to book.html with property details as URL parameters
            window.location.href = `book.html?property_id=${propertyId}&property_title=${encodeURIComponent(propertyTitle)}&property_region=${encodeURIComponent(propertyRegion)}&property_rooms=${propertyRooms}&property_price=${propertyPrice}&property_image=${encodeURIComponent(propertyImage)}`;
        });
    }
}
