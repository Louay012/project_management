<?php

header("Access-Control-Allow-Origin: http://localhost:3000"); // Allow requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db_con.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    $team_id = $input['team_id'];

    try {
        // SQL Query
        $stmt = $pdo->prepare(
            "SELECT
               u.username username,
               count(distinct ts.task_id) total_tasks
             FROM
                users u
             JOIN 
                team_users tu ON u.user_id = tu.user_id
             JOIN
                teams t ON tu.team_id = t.team_id and t.team_id=:team_id
             JOIN
                tasks ts ON ts.user_id = u.user_id
             group by
             u.username; "
        );

        $stmt->bindParam(':team_id', $team_id);
        $stmt->execute();
        $task_count = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt1 = $pdo->prepare(
            "SELECT 
                AVG(task_avg_days) AS avg_days
            FROM (
                SELECT 
                    t.task_id,
                    AVG(DATEDIFF(ts.submitted_at, t.created_at)) AS task_avg_days
                FROM 
                    task_submissions ts
                JOIN 
                    tasks t ON ts.task_id = t.task_id
                JOIN 
                    team_users tu ON ts.user_id = tu.user_id
                JOIN 
                    teams tm ON tu.team_id = tm.team_id AND tm.team_id = :team_id
                GROUP BY 
                    t.task_id
            ) AS task_averages;

                "
        );

        $stmt1->bindParam(':team_id', $team_id);
        $stmt1->execute();
        $avg_sub = $stmt1->fetchAll(PDO::FETCH_ASSOC);
        $stmt2 = $pdo->prepare(
            "SELECT
                u.user_id,
                u.username AS username,
                u.email AS email,
                u.created_at as added,
                tu.role AS role,
                t.name AS team_name,
                t.team_id AS team_id,
                p.title AS project_title
             FROM
                users u
             JOIN 
                team_users tu ON u.user_id = tu.user_id
             JOIN
                teams t ON tu.team_id = t.team_id
             JOIN
                projects p ON t.project_id = p.project_id
             WHERE 
                t.team_id =:team_id "
        );

        $stmt2->bindParam(':team_id', $team_id);
        $stmt2->execute();
        $results = $stmt2->fetchAll(PDO::FETCH_ASSOC);

        $teams = [];
        foreach ($results as $row) {
            $team_id = $row['team_id'];
            if (!isset($teams[$team_id])) {
                $teams[$team_id] = [
                    'team_id' => $team_id,
                    'team_name' => $row['team_name'],
                    'project_title' => $row['project_title'],
                    'members' => [] 
                ];
            }
            // Add member details
            $teams[$team_id]['members'][] = [
                'id' => $row['user_id'],
                'username' => $row['username'],
                'email' => $row['email'],
                'role' => $row['role'],
                'added' => $row['added']
            ];
        }


       

        echo json_encode(['success' => true, 'task_count' => $task_count,'avg_sub'=>$avg_sub,'team' => array_values($teams)]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$pdo = null;

?>
