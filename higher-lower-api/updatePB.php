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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['username'], $data['newScore'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields", "data" => $data]);
    exit;
}

$sql = "SELECT personalBest FROM users WHERE username = :username";
$personalBest = query($sql, [
    ':username' => $data["username"]
]);

if ($personalBest instanceof PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
    exit;
}

$personalBest = $personalBest->fetch(PDO::FETCH_ASSOC);

if ($personalBest === false) {
    http_response_code(500);
    echo json_encode(["error" => "User does not exist"]);
    exit;
}

if (intval($personalBest["personalBest"]) < $data["newScore"]) {
    $updateSql = "UPDATE users SET personalBest = :newScore WHERE username = :username";
    $updateResult = query($updateSql, [
        ':newScore' => $data["newScore"],
        ':username' => $data["username"]
    ]);

    if ($updateResult instanceof PDOException) {
        http_response_code(500);
        echo json_encode(["error" => "Failed to update personalBest", "details" => $updateResult->getMessage()]);
        exit;
    }
}

echo json_encode(["message" => "success"]);