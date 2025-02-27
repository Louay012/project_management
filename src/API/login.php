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
    

    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
   try {
    $stmt=$pdo->prepare("select user_id,username,email from users where email=:email and password=:pass ");
    $stmt->bindParam(':email',$email);
    $stmt->bindParam(':pass',$password);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if($user){
        $_SESSION['user_id'] = $user['user_id'];
        echo json_encode(['success' => true, 'message' => 'Login successful', 'data'=>$user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
    }
    $stmt=null;
    }
        catch (Exception $e) {
        // Catch any database-related errors
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
}
    $pdo=null;

?>