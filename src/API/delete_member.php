<?php

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
include 'db_con.php';
session_start();
if($_SERVER['REQUEST_METHOD']=='POST'){
    $input = json_decode(file_get_contents('php://input'), true);
    

    $member_id = $input['member_id'] ?? '';
    $team_id = $input['team_id'] ?? '';

   try {
    $stmt=$pdo->prepare("delete from team_users  where user_id=:member_id and team_id=:team_id ");
    $stmt->bindParam(':member_id',$member_id);
    $stmt->bindParam(':team_id',$team_id);
    $stmt->execute(); 
    echo json_encode(['success' => true, 'message' => 'member deleted successfully']);
    $stmt=null;
    }
        catch (Exception $e) {
     
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Connection Error']);
}
    $pdo=null;

?>