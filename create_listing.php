<?php
require 'config.php';

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $region = $_POST['region'];
    $rooms = $_POST['rooms'];
    $price = $_POST['price'];
    $photo = $_FILES['photo'];

    // Server-side validation
    if (!preg_match("/^[a-zA-Z\s]+$/", $title)) {
        echo json_encode(['error' => 'Title must contain only characters.']);
        exit;
    }

    if (!preg_match("/^[a-zA-Z\s]+$/", $region)) {
        echo json_encode(['error' => 'Region must contain only characters.']);
        exit;
    }

    if (!filter_var($rooms, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]])) {
        echo json_encode(['error' => 'Number of rooms must be a whole number greater than 0.']);
        exit;
    }

    if (!filter_var($price, FILTER_VALIDATE_INT, ["options" => ["min_range" => 1]])) {
        echo json_encode(['error' => 'Price per night must be a whole number greater than 0.']);
        exit;
    }

    // Handle file upload
    $targetDir = "uploads/";
    if (!is_dir($targetDir) && !mkdir($targetDir, 0755, true)) {
        echo json_encode(['error' => 'Failed to create upload directory.']);
        exit;
    }

    $targetFile = $targetDir . basename($photo["name"]);
    if (move_uploaded_file($photo["tmp_name"], $targetFile)) {
        // Insert listing into the database
        $stmt = $conn->prepare("INSERT INTO listings (title, region, rooms, price, image_path) VALUES (?, ?, ?, ?, ?)");
        if ($stmt === false) {
            echo json_encode(['error' => 'Error preparing statement: ' . $conn->error]);
            exit;
        }

        $stmt->bind_param("ssids", $title, $region, $rooms, $price, $targetFile);
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error executing statement: ' . $stmt->error]);
        }
    } else {
        echo json_encode(['error' => 'Error uploading photo.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>
