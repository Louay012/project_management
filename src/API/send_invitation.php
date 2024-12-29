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
    $email = $input['email']  ;
    
   

   try {
    
    
    $stmt=$pdo->prepare("select * from users u where u.email = :email ");

    $stmt->bindParam(':email',$email);
    
    $stmt->execute();

    $stmt1=$pdo->prepare("insert into invvitations (title,user_id,description,status,priority,deadline,project_id,created_at) values(:title,:user_id,:description,'Pending',:priority,:deadline,:project_id,now()) ");

    $stmt1->bindParam(':title',$title);
    $stmt1->bindParam(':description',$description);
    $stmt1->bindParam(':priority',$priority);
    $stmt1->bindParam(':user_id',$user);
    $stmt1->bindParam(':deadline',$deadline);
    $stmt1->bindParam(':project_id',$project_id);
    $stmt1->execute();
    if($stmt1){
       
        echo json_encode(['success' => true, 'message' => 'Task added successfully! ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to add the task.']);
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