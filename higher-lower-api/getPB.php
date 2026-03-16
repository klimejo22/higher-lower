<?php
require_once "lib/db.php";
require_once "lib/errorHandling.php";
require_once "lib/var_dump_plus.php";
require_once "lib/sql.php";
require_once "lib/logging.php";
require_once "lib/normalizeString.php";
require_once "lib/hash.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


if (empty($_GET["username"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields", "data" => $_GET]);
    exit;
}

$sql = "SELECT personalBest FROM users WHERE username = :username";
$personalBest = query($sql, [
    ':username' => $_GET["username"]
]);

if ($personalBest instanceof PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
    exit;
}

echo json_encode($personalBest->fetch(PDO::FETCH_ASSOC));