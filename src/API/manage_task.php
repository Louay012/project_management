<?php

header("Access-Control-Allow-Origin: *");// Allow requests from this origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Allow specific HTTP methods
header("Access-Control-Allow-Headers: Content-Type");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
    
}

include 'db_con.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user_id = $_POST['user_id'];
    $task_id = $_POST['task_id'];
    $message = $_POST['message'];

    $uploadDir = "C:/xampp/htdocs/project_management/public/uploads/";

    

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true); // Ensure the directory exists
    }

    if (isset($_FILES['file']) ) {
        if($_FILES['file']['error'] === UPLOAD_ERR_OK){
        $fileName = basename($_FILES['file']['name']);
        $filePath = $uploadDir . $fileName;
        
        while (file_exists($filePath)) {
            $filePath = $uploadDir . date('Y-m-d_H-i-s') . "_" . $fileName;
        }

        if (move_uploaded_file($_FILES['file']['tmp_name'], $filePath)) {
            try {
                $stmt = $pdo->prepare("INSERT INTO task_submissions (task_id, user_id, message, file_path) VALUES (:task_id, :user_id, :message, :file_path)");

                $stmt->bindParam(':user_id', $user_id);
                $stmt->bindParam(':task_id', $task_id);
                $stmt->bindParam(':message', $message);
                $stmt->bindParam(':file_path', $filePath);

                $stmt->execute();

                $stmt1 = $pdo->prepare("UPDATE tasks SET status = 'Awaiting Approval' WHERE task_id = :task_id");
                $stmt1->bindParam(':task_id', $task_id);
                $stmt1->execute();

                $stmt = null;
                $stmt1 = null;

                echo json_encode(['success' => true, 'message' => 'Task submitted and file uploaded successfully']);
            } catch (Exception $e) {
                // Catch any database-related errors
                echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to upload the file.'
            ]);
        }
    }} else {
        try {
            $stmt = $pdo->prepare("INSERT INTO task_submissions (task_id, user_id, message) VALUES (:task_id, :user_id, :message)");

            $stmt->bindParam(':user_id', $user_id);
            $stmt->bindParam(':task_id', $task_id);
            $stmt->bindParam(':message', $message);
           

            $stmt->execute();
            $stmt1 = $pdo->prepare("UPDATE tasks SET status = 'Awaiting Approval' WHERE task_id = :task_id");
            $stmt1->bindParam(':task_id', $task_id);
            $stmt1->execute();

            $stmt = null;
            $stmt1 = null;
        } catch (Exception $e) {
            // Catch any database-related errors
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
        echo json_encode([
            'success' => true,
            'message' => 'Task submitted without uploading a file'
        ]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Connecting error']);
}

$pdo = null;

?>
