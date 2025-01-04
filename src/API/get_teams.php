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
    $user_id = $input['user_id'];

    try {
        // SQL Query
        $stmt = $pdo->prepare(
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
                t.team_id IN (SELECT team_id FROM team_users WHERE user_id = :user_id) "
        );

        $stmt->bindParam(':user_id', $user_id);
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


        foreach ($teams as &$team) {
            $team['nb_user'] = count($team['members']);
        }

        echo json_encode(['success' => true, 'data' => array_values($teams)]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$pdo = null;

?>
