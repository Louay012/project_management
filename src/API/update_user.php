<?php

header("Access-Control-Allow-Origin: *"); // Allow requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db_con.php';
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    

    $user_id = $input['user_id'] ?? '';
    $username = $input['username'] ?? '';
    $password = $input['password'] ?? '';

   try {
    $stmt=$pdo->prepare("update users set username=:username, password=:password where user_id=:user_id  ");
    $stmt->bindParam(':user_id',$user_id);
    $stmt->bindParam(':username',$username);
    $stmt->bindParam(':password',$password);
    $stmt->execute();
    
    echo json_encode(['success' => true, 'message' => 'Your information updated successfully']);
  
    $stmt=null;
    }
        catch (Exception $e) {
        // Catch any database-related errors
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Connection Error']);
}
    $pdo=null;

?>