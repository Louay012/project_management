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
    
   $invitation_id=$input['invitation_id'];

   try {
    
    
    
    
        $stmt2=$pdo->prepare("delete  from invitations  where invitations.id =:invitation_id ");
        $stmt2->bindParam(':invitation_id',$invitation_id);
        $stmt2->execute();
    if($stmt2){
        echo json_encode(['success' => true, 'message' => 'invite rejected ! ']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to reject the invite.']);
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