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
                        t.task_id id,
                        t.title task_title,
                        t.description,
                        t.priority,
                        t.status,
                        t.deadline,
                        t.created_at

                    FROM 
                        tasks t 
                    JOIN 
                        projects p
                    ON 
                        p.project_id = t.project_id 
                    
                    WHERE
                        t.user_id= :user_id");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
   
  
    $stmt=null;


    echo json_encode(['success' => true, 'tasks'=>$tasks ]);
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