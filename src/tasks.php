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
    $input = json_decode(file_get_contents("php://input"), true);
    $user_id = $input['user_id']  ;
   

   try {
    $stmt=$pdo->prepare("SELECT
    task_id,
	t.title task_title,
    description,
    priority,
    t.status,
    t.dead_line

FROM 
    tasks t 
JOIN 
    projects p
ON 
    p.project_id = t.project_id 
JOIN
    task_users tu
ON
    tu.task_id=t.task_id
WHERE
	tu.user_id= :user_id  ");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
   
  
    $stmt=null;


    echo json_encode(['success' => true, 'data'=>$tasks ]);
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