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
    
    $title = $input['title']  ;
    $description = $input['description']  ;
    $deadline = $input['deadline']  ;
    $team_name= $input['teamname'];
    $manager= $input['manager'];
   

   try {

    $stmt1=$pdo->prepare("insert into projects(title,description,status,created_at,deadline) values(:title,:description,'in-progress',now(),:deadline)");

    $stmt1->bindParam(':title',$title);
    $stmt1->bindParam(':description',$description);
    $stmt1->bindParam(':deadline',$deadline);
    $stmt1->execute();
    if($stmt1){
        $project_id = $pdo->lastInsertId();
        $stmt2=$pdo->prepare("insert into teams(name,project_id) values(:name,:projet_id)");
        $stmt2->bindParam(':name',$team_name);
        $stmt2->bindParam(':projet_id',$project_id);
        $stmt2->execute();
        if($stmt2){
            $last_id2 = $pdo->lastInsertId();
            $stmt3=$pdo->prepare("insert into team_users(team_id,user_id,role) values(:team_id,:manager_id,'manager')");
            $stmt3->bindParam(':team_id',$last_id2);
            $stmt3->bindParam(':manager_id',$manager);
            $stmt3->execute();
            echo json_encode(['success' => true, 'message' => 'Project Created successfully! ', 'project_id'=>$project_id]);
    }
   
       
        
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create Project.']);
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