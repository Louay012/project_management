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
                         p.project_id id

                    from
                        projects p
                    Join
                        teams t
                    ON
                        p.project_id = t. project_id
                    Join
                        team_users tu
                    ON
                       t.team_id=tu.team_id
                    join 
                        tasks ta
                    on 
                        p.project_id = ta.project_id
                    WHERE
                       tu.user_id= :user_id and tu.role='manager' and ta.status='Awaiting Approval' 
                    GROUP BY id");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    $stmt1=$pdo->prepare("SELECT
                        p.project_id id,
                        p.title project_title

                        

                    FROM 
                        tasks t 
                    JOIN 
                        projects p
                    ON 
                        p.project_id = t.project_id 
                    
                    WHERE
                        t.user_id= :user_id and (t.status='In-Progress' or t.status='Pending') ");

    $stmt1->bindParam(':user_id',$user_id);
  
    $stmt1->execute();
    $tasks = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    
   
  
    $stmt=null;
   
  
    $stmt1=null;


    echo json_encode(['success' => true, 'data1'=>$projects ,'data2'=> $tasks ]);
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