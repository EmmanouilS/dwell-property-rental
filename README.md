# Dwell - Property Rental Platform 🏠

> A full-stack web application for viewing, booking, and managing real estate properties.

![Dwell Feed Screenshot]screenshots/feed.png
![Dwell Login Screenshot]screenshots/login.png
![Dwell Create Listing Screenshot]screenshots/create_listing.png
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
3. Import the `.sql` file into your MySQL database via phpMyAdmin (or any MySQL tool).
4. Update `config.php` with your database credentials (hostname, username, password, database name).
   - If the database has been moved to another machine or port, make sure to update those values as well.

5. **Run the application through a web server that supports PHP**. You can use:
   - A local stack such as **XAMPP, WAMP, Laragon** on Windows, or
   - PHP's built‑in server (`php -S localhost:8000` from the project root) after installing PHP.
   Opening `feed.html` directly with the `file://` protocol will always fail with "Failed to fetch properties."  

6. In your browser go to `http://localhost/dwell/feed.html` (adjust path/port according to your setup).