document.addEventListener("DOMContentLoaded", function () {
    if (typeof window.isLoggedIn === 'undefined') return;

    // Fetch properties from the server
    fetch('feed.php?action=fetch_properties')
        .then(response => response.json())
        .then(properties => {
            const propertiesContainer = document.querySelector(".properties");

            if (properties.length === 0) {
                propertiesContainer.innerHTML = "<p>No properties found.</p>";
                return;
            }

            properties.forEach(property => {
                renderProperty(property, propertiesContainer, window.isLoggedIn); // Use global isLoggedIn
            });
        })
        .catch(error => {
            console.error("Error fetching properties:", error);
            const propertiesContainer = document.querySelector(".properties");
            propertiesContainer.innerHTML = "<p>Failed to fetch properties. Please try again later.</p>";
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
