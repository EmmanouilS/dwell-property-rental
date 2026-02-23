<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection settings
// You can override any of these values with environment variables if the DB
// has been moved or you want to avoid committing credentials to source control.
$servername = getenv('DB_HOST') ?: 'localhost';
$username   = getenv('DB_USER') ?: 'root';
$password   = getenv('DB_PASS') ?: '';
$dbname     = getenv('DB_NAME') ?: 'ds_estate';

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    // log error, but do not output it raw in production
    error_log('DB connection failed: ' . $conn->connect_error);
    // die with a message that feed.php will turn into JSON
    die('Database connection failed');
}
?>
