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
    $project_id = $input['project_id']  ;
    $user_id = $input['user_id']  ;

   try {
    $stmt=$pdo->prepare("SELECT
                        p.title project_title,
                        p.project_id id,
                        p.description,
                        p.status,
                        p.deadline,
                        p.created_at,
                        tu.role role,
                        DATEDIFF(p.deadline, CURDATE())  days_until_deadline
                    from
                    teams t , team_users tu ,projects p
                    WHERE t.project_id = p.project_id and p.project_id=:project_id and tu.user_id=:user_id ");

    $stmt->bindParam(':project_id',$project_id);
    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    $details = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt1=$pdo->prepare("SELECT
                        t.task_id id,
                        t.title task_title,
                        t.description,
                        t.priority,
                        t.status,
                        t.deadline
                    from
                    tasks t  ,projects p
                    WHERE t.project_id = p.project_id and p.project_id=:project_id");

    $stmt1->bindParam(':project_id',$project_id);
  
    $stmt1->execute();
    $tasks = $stmt1->fetchAll(PDO::FETCH_ASSOC);
    $stmt2=$pdo->prepare("SELECT
    COUNT(CASE WHEN t.status = 'Completed' THEN 1 END) AS completed,
    COUNT(CASE WHEN t.status = 'In-Progress' THEN 1 END) AS in_progress,
    COUNT(CASE WHEN t.status = 'Pending' THEN 1 END) AS pending
        FROM
            tasks t
        JOIN
            projects p ON t.project_id = p.project_id
        WHERE
            p.project_id = :project_id;");

    $stmt2->bindParam(':project_id',$project_id);
    $stmt2->execute();
    $stats = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    $stmt3=$pdo->prepare("SELECT
                        u.user_id id,
                        u.username,
                        u.email,
                        tu.role
                    from
                    users u ,teams t , team_users tu 
                    WHERE t.project_id = :project_id  and tu.team_id=t.team_id and tu.user_id=u.user_id");

    $stmt3->bindParam(':project_id',$project_id);
  
    $stmt3->execute();
    $members = $stmt3->fetchAll(PDO::FETCH_ASSOC);
    $stmt4=$pdo->prepare("SELECT
                        ts.submission_id id,
                        p.title project_title,
                        t.task_id id,
                        t.title task_title,
                        t.description,
                        t.priority,
                        t.status,
                        t.deadline,
                        t.created_at,
                        t.review,
                        ts.message,
                        ts.file_path,
                        ts.submitted_at,
                        u.username,
                        u.email
                    FROM 
                        tasks t , task_submissions ts,projects p,users u
                  
                     WHERE
                        p.project_id = t.project_id and t.user_id= :user_id and u.user_id=t.user_id and t.task_id=ts.task_id and t.project_id =:project_id ");

    $stmt4->bindParam(':user_id',$user_id);
    $stmt4->bindParam(':project_id',$project_id);
    $stmt4->execute();
    $Sub_tasks = $stmt4->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'details'=>$details,'tasks'=>$tasks ,'stats'=>$stats ,'members'=>$members ,'Sub_tasks'=>$Sub_tasks]);
    $stmt=null;
    $stmt1=null;
    $stmt2=null;
    $stmt3=null;
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