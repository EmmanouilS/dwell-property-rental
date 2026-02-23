# Dwell - Property Rental Platform 🏠

> A full-stack web application for viewing, booking, and managing real estate properties.

![Dwell Feed Screenshot](https://via.placeholder.com/800x400?text=Screenshot+Coming+Soon)

## 📖 About The Project
"Dwell" is a property rental platform developed as part of the **Web and Mobile Information Systems** course at the University of Piraeus. It simulates a marketplace where users can explore property listings, register/login, book properties for specific dates, and even create their own property listings.

## 🛠️ Built With
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** PHP
- **Database:** MySQL 
- **APIs:** Google Maps Embed API (used in the footer for location)

## ✨ Key Features
- **Property Feed:** Dynamic grid displaying available properties with images, prices, and room details.
- **User Authentication:** Secure Login and Registration system.
- **Booking System:** Users can select start and end dates to book a property, with availability validation.
- **Listing Creation:** Authenticated users can upload new properties with photos, region, rooms, and nightly price.

## 🚀 How to Run Locally
1. Clone the repository.
2. Move the project folder to your local server's root directory (e.g., `C:\xampp\htdocs\dwell`).
3. Import the `.sql` file into your MySQL database via phpMyAdmin.
4. Update `config.php` with your database credentials.
5. Open your browser and navigate to `http://localhost/dwell/feed.html`.