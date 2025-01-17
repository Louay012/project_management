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

    $stmt1=$pdo->prepare("select * from team_users where user_id = :user_id and team_id=:team_id ");
    $stmt1->bindParam(':user_id',$user[0]['user_id']);
    $stmt1->bindParam(':team_id',$team_id);
    $stmt1->execute();
    $member = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    if($member){
        echo json_encode(['success' => false, 'message' => 'Member already exists in the team']);
    }
    else{
    $stmt2=$pdo->prepare("insert into invitations (sender_id,description,recipient_email,role,team_id,sent_at) values(:sender_id,:description,:recipient_email,:role,:team_id,now()) ");
    $stmt2->bindParam(':sender_id',$user_id);
    $stmt2->bindParam(':description',$description);
    $stmt2->bindParam(':recipient_email',$email);
    $stmt2->bindParam(':role',$role);
    $stmt2->bindParam(':team_id',$team_id);
    $stmt2->execute();

    if($stmt2){
       
        echo json_encode(['success' => true, 'message' => 'Invitation sent successfully! ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send the invitation.']);
    }
}
    }else{
        echo json_encode(['success' => false, 'message' => 'user Email does not exist ']);
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