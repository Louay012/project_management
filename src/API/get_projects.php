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
    $user_id = $input['user_id']  ;
   

   try {
    $stmt=$pdo->prepare("SELECT
                        p.title project_title,
                        p.project_id id,
                        p.description,
                        p.status,
                        p.deadline,
                        p.created_at

                    from
                    teams t , team_users tu ,projects p
                    WHERE
                       t.team_id=tu.team_id and tu.user_id= :user_id and t.project_id = p.project_id ");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
   
  
    $stmt=null;


    echo json_encode(['success' => true, 'data'=>$projects ]);
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