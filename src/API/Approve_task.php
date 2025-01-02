<?php

header("Access-Control-Allow-Origin: http://localhost:3000");// Allow requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db_con.php';
session_start();

if($_SERVER['REQUEST_METHOD']=='POST'){
    $input = json_decode(file_get_contents("php://input"), true);

    $task_id = $input['task_id']  ;
    $review = $input['review'];
    $status = $input['status'];
   

   try {
    
    
    
    $stmt1=$pdo->prepare("update  tasks set status=:status,review=:review  where task_id=:task_id");
    
    $stmt1->bindParam(':task_id',$task_id);
    $stmt1->bindParam(':status',$status);
    $stmt1->bindParam(':review',$review);

    $stmt1->execute();
    if($stmt1){
       
        echo json_encode(['success' => true, 'message' => 'Review is sent Successfully ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send Review.']);
    }
    }
    catch (Exception $e) {
        // Catch any database-related errors
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'connecting error']);
}
    $pdo=null;

?>