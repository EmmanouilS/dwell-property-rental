<?php
require 'config.php'; // Include your database configuration file here

// Set the content type to JSON
header('Content-Type: application/json');

// Function to send JSON response with appropriate status code
function send_json_response($status, $message) {
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit;
}

// Function to calculate total price with random discount
function calculateTotalPrice($price_per_night, $number_of_nights) {
    // Generate random discount percentage between 10 to 30
    $discount_percentage = rand(10, 30) / 100;
    
    // Apply the discount to the total price
    $total_price = $price_per_night * $number_of_nights * (1 - $discount_percentage);

    // Return the total price rounded to two decimal places
    return round($total_price, 2);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Determine action based on the presence of certain fields
    if (isset($data['action'])) {
        $action = $data['action'];
    } else {
        // Default to booking action if no action specified
        $action = 'book';
    }

    if ($action === 'check_availability') {
        $listing_id = $data['listing_id'] ?? '';
        $start_date = $data['start_date'] ?? '';
        $end_date = $data['end_date'] ?? '';

        // Validate required fields
        if (empty($listing_id) || empty($start_date) || empty($end_date)) {
            send_json_response(400, 'Listing ID, start date, and end date are required.');
        }

        // Check availability
        try {
            // Prepare SQL statement to count overlapping reservations
            $stmt = $conn->prepare("SELECT COUNT(*) AS count FROM reservations WHERE listing_id = ? AND (
                (start_date BETWEEN ? AND ?)
                OR (end_date BETWEEN ? AND ?)
                OR (? BETWEEN start_date AND end_date)
            )");

            if ($stmt === false) {
                send_json_response(500, 'Error preparing availability check statement: ' . $conn->error);
            }

            // Bind parameters and execute statement
            $stmt->bind_param("isssss", $listing_id, $start_date, $end_date, $start_date, $end_date, $start_date);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                $count = $row['count'];
                $available = $count == 0; // Property is available if count is 0 (no overlapping reservations)
                
                // Calculate number of nights
                $start_date_obj = new DateTime($start_date);
                $end_date_obj = new DateTime($end_date);
                $number_of_nights = $start_date_obj->diff($end_date_obj)->days;

                // Fetch price per night from the database
                $stmt_price = $conn->prepare("SELECT price FROM listings WHERE id = ?");
                $stmt_price->bind_param("i", $listing_id);
                $stmt_price->execute();
                $result_price = $stmt_price->get_result();
                $row_price = $result_price->fetch_assoc();
                $price_per_night = $row_price['price'];
                $stmt_price->close();

                // Calculate total price
                $total_price = calculateTotalPrice($price_per_night, $number_of_nights);
                
                echo json_encode(['available' => $available, 'total_price' => $total_price]);
            } else {
                send_json_response(500, 'Error executing availability check statement: ' . $stmt->error);
            }

            $stmt->close(); // Close statement
        } catch (Exception $e) {
            send_json_response(500, 'Error checking availability: ' . $e->getMessage()); // Handle any exceptions
        }
    } elseif ($action === 'book') {
        // Retrieve booking details from the form
        $user_id = $_POST['user_id'] ?? '';
        $listing_id = $_POST['listing_id'] ?? '';
        $start_date = $_POST['start_date'] ?? '';
        $end_date = $_POST['end_date'] ?? '';
        $first_name = $_POST['first_name'] ?? '';
        $last_name = $_POST['last_name'] ?? '';
        $email = $_POST['email'] ?? '';
        $total_price = $_POST['total_price'] ?? 0;
        
        // Validate required fields
        if (empty($user_id) || empty($listing_id) || empty($start_date) || empty($end_date) || empty($first_name) || empty($last_name) || empty($email)) {
            send_json_response(400, 'All fields are required.');
        }

        // Insert reservation into database
        try {
            // Prepare SQL statement to insert reservation
            $stmt = $conn->prepare("INSERT INTO reservations (user_id, listing_id, start_date, end_date, first_name, last_name, email, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            if ($stmt === false) {
                send_json_response(500, 'Error preparing statement: ' . $conn->error);
            }

            // Bind parameters and execute statement
            $stmt->bind_param("iisssssd", $user_id, $listing_id, $start_date, $end_date, $first_name, $last_name, $email, $total_price);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'total_price' => $total_price]); // Return success response with total price
            } else {
                send_json_response(500, 'Error executing statement: ' . $stmt->error);
            }

            $stmt->close(); // Close statement
        } catch (Exception $e) {
            send_json_response(500, 'Error inserting reservation: ' . $e->getMessage());
        }
    } else {
        send_json_response(400, 'Invalid action.');
    }
} else {
    send_json_response(405, 'Method not allowed'); // Handle unsupported request methods
}

$conn->close(); // Close database connection
?>
