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


if (empty($_GET["token"])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields", "data" => $_GET]);
    exit;
}

$token = $_GET['token'];
$now = time();

$sql = "SELECT u.username FROM tokens t JOIN users u ON t.pid = u.id WHERE t.token = :token AND t.exp > :now ORDER BY exp DESC LIMIT 1";

$result = query($sql, [
    ':token' => $token,
    ':now' => $now
]);

if ($result instanceof PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
    exit;
}

$result = $result->fetch(PDO::FETCH_ASSOC);

if (empty($result)) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}


echo json_encode($result);