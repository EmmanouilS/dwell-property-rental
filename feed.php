<?php
header('Content-Type: application/json');
require 'config.php';

// if config failed to create connection it will have triggered a die()/fatal error
// which will break JSON; we guard here just in case instead of trusting config.
if (!isset($conn) || $conn->connect_error) {
    echo json_encode(['error' => 'Database connection failed: ' . ($conn->connect_error ?? 'unknown')]);
    exit;
}

$action = $_GET['action'] ?? '';

if ($action === 'fetch_properties') {
    $stmt = $conn->prepare("SELECT * FROM listings");
    if ($stmt === false) {
        echo json_encode(['error' => 'Prepare failed: ' . $conn->error]);
        exit;
    }
    $stmt->execute();
    $result = $stmt->get_result();

    $properties = [];
    while ($row = $result->fetch_assoc()) {
        $properties[] = $row;
    }

    // Close statement and database connection
    $stmt->close();
    $conn->close();

    // Output JSON with property details including listing_id
    echo json_encode($properties);
} else {
    echo json_encode(['error' => 'Invalid action']);
}
?>
