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
    $email = $input['email']  ;
   try {
    $stmt=$pdo->prepare("SELECT
                        count(ts.submission_id) nb_submissions,
                        DATE(submitted_at) submission_date
                    from
                    task_submissions ts
                    WHERE ts.user_id=:user_id group by DATE(submitted_at)");


    $stmt->bindParam(':user_id',$user_id);
    $stmt->execute();
    $task_submitted = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $stmt2=$pdo->prepare("SELECT
    COUNT(CASE WHEN t.status = 'Completed' THEN 1 END) AS completed,
    COUNT(CASE WHEN t.status = 'In-Progress' THEN 1 END) AS in_progress,
    COUNT(CASE WHEN t.status = 'Pending' THEN 1 END) AS pending
        FROM
            tasks t
        
        WHERE
            t.user_id = :user_id;");

    $stmt2->bindParam(':user_id',$user_id);
    $stmt2->execute();
    $stats = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    $stmt = $pdo->prepare("
    SELECT
        i.id id,
        i.description description,
        i.role role,
        Date(i.sent_at) sent,
        Date(i.expires_at) expires,
        u.email email,
        t.name team,
        t.team_id team_id
    FROM
        invitations i
    JOIN users u ON i.sender_id = u.user_id
    JOIN teams t ON i.team_id = t.team_id
    WHERE
        i.recipient_email = :email
");



    $stmt->bindParam(':email',$email);
    $stmt->execute();
    $invitations = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'task_submitted'=>$task_submitted,'stats'=>$stats,'invitations'=>$invitations]);
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