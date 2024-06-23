<?php
require 'config.php';

// Function to validate registration inputs
function validateRegistrationInput($firstName, $lastName, $password, $email) {
    if (!preg_match("/^[a-zA-Z]+$/", $firstName)) {
        return "Invalid first name. Only characters are allowed.";
    }
    if (!preg_match("/^[a-zA-Z]+$/", $lastName)) {
        return "Invalid last name. Only characters are allowed.";
    }
    if (strlen($password) < 4 || strlen($password) > 10 || !preg_match("/\d/", $password)) {
        return "Password must be 4-10 characters long and contain at least one number.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return "Invalid email format.";
    }
    return null;
}

$action = $_POST['action'] ?? '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($action === 'register') {
        $firstName = trim($_POST['first_name']);
        $lastName = trim($_POST['last_name']);
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);
        $email = trim($_POST['email']);

        // Validate registration inputs
        $validationError = validateRegistrationInput($firstName, $lastName, $password, $email);
        if ($validationError) {
            echo $validationError;
            exit;
        }

        // Check for unique username and email
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            echo "Username or email already exists.";
            exit;
        }

        // Insert new user
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, username, password, email) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstName, $lastName, $username, $hashedPassword, $email);
        $success = $stmt->execute();
        $stmt->close();

        if ($success) {
            echo "Registration successful";
        } else {
            echo "Registration failed.";
        }
    } elseif ($action === 'login') {
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        // Validate login inputs
        if (empty($username) || empty($password)) {
            echo "Username and password are required.";
            exit;
        }

        // Check user credentials
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if ($user && password_verify($password, $user['password'])) {
            // Set cookies on successful login
            setcookie('user_id', $user['id'], time() + (86400 * 30), "/");  // Example: Set for 30 days
            setcookie('username', $user['username'], time() + (86400 * 30), "/");
            setcookie('first_name', $user['first_name'], time() + (86400 * 30), "/");
            setcookie('last_name', $user['last_name'], time() + (86400 * 30), "/");
            setcookie('email', $user['email'], time() + (86400 * 30), "/");

            echo "success";
        } else {
            echo "Invalid username or password.";
        }
    }
}

$conn->close();
?>
