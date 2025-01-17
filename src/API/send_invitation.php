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
    $user_id = $input['sender_id'];
    $role = $input['role'];
    $description = $input['description'];
    $team_id = $input['team_id'];
   

   try {
    
    
    $stmt=$pdo->prepare("select * from users u where u.email = :email ");

    $stmt->bindParam(':email',$email);
    
    $stmt->execute();
    $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
if($user){
    $stmt1=$pdo->prepare("insert into invitations (sender_id,description,recipient_email,role,team_id,sent_at) values(:sender_id,:description,:recipient_email,:role,:team_id,now()) ");

    $stmt1->bindParam(':sender_id',$user_id);
    $stmt1->bindParam(':description',$description);
    $stmt1->bindParam(':recipient_email',$email);
    $stmt1->bindParam(':role',$role);
    $stmt1->bindParam(':team_id',$team_id);
  
    $stmt1->execute();
    if($stmt1){
       
        echo json_encode(['success' => true, 'message' => 'Invitation sent successfully! ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send the invitation.']);
    }
    }else{

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