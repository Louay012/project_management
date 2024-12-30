<?php
// Path to your uploads folder
$uploadsDir = "C:/xampp/htdocs/project_management/public/uploads/";

// Check if the 'file' parameter is set in the URL
if (isset($_GET['file'])) {
    $fileName = basename($_GET['file']);  // Sanitize the file name to avoid directory traversal attacks
    $filePath = $uploadsDir . $fileName;

    // Check if the file exists
    if (file_exists($filePath)) {
        // Set headers for download
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $fileName . '"');
        header('Content-Length: ' . filesize($filePath));

        // Read the file and send it to the user
        readfile($filePath);
        exit;
    } else {
        echo "File not found.";
    }
} else {
    echo "No file specified.";
}
?>