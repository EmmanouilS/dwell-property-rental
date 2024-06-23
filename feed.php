<?php
require 'config.php';

$action = $_GET['action'] ?? '';

if ($action === 'fetch_properties') {
    $stmt = $conn->prepare("SELECT * FROM listings");
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
