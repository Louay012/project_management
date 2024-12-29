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

    $stmt=$pdo->prepare(
                    "SELECT
                        count(u.user_id) as nb_user,
                        u.user_id,
                        u.username username,
                        u.email email,
                        tu.role role,
                        t.name team_name,
                        t.team_id team_id,
                        p.title project_title
                    from
                        users u 
                     JOIN 
                        team_users tu 
                    on 
                        u.user_id=tu.user_id
                     Join
                        teams t
                    on
                        tu.team_id= t.team_id
                     Join
                        projects p
                    on 
                        t.project_id=p.project_id
                    WHERE 
                        t.team_id in (select team_id from team_users where user_id=:user_id)
                    GROUP BY
                        t.team_id, p.title
                    
                    ");

    $stmt->bindParam(':user_id',$user_id);
  
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $teams = [];
    foreach ($results as $row) {
        $team_id = $row['team_id'];
        if (!isset($teams[$team_id])) {
            $teams[$team_id] = [
                'team_id' => $team_id,
                'team_name' => $row['team_name'],
                'project_title' => $row['project_title'],
                'nb_user' => $row['nb_user'],
                'members' => []
            ];
        }
        if ($row['user_id']) { // Only add members if they exist
            $teams[$team_id]['members'][] = [
                'id' => $row['user_id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'role' => $row['role']
            ];
        }
    }
    echo json_encode(['success' => true,'data'=>array_values($teams)]);
    $stmt=null;
   
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