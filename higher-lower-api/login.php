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

if (!isset($data['username'], $data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields", "data" => $data]);
    exit;
}

$username = $data['username'];
$passwordHash = HashPassword($data['password']);

$checkSql = "SELECT id FROM users WHERE username = :username AND password = :password";
$existingUser = query($checkSql, [
    ':username' => $username,
    ":password" => $passwordHash,
]);

if ($existingUser instanceof PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
    exit;
}

if (empty($existingUser)) {
    http_response_code(409);
    echo json_encode(["error" => "User doesnt exist"]);
    exit;
}

$token = generateToken();
$userId = $existingUser->fetch(PDO::FETCH_ASSOC)["id"];
$exp = time() + 10 * 60 * 60;
$sql = "INSERT INTO tokens (token, pid, exp) VALUES (:token, :pid, :exp)";
$result = query($sql, [
    ':token' => $token,
    ':pid'   => $userId,
    ':exp'   => $exp
]);

if ($result instanceof PDOException) {
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
    exit;
}

echo json_encode(["token" => $token]);