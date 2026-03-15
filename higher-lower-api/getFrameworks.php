<?php
require_once "lib/db.php";
require_once "lib/errorHandling.php";
require_once "lib/var_dump_plus.php";
require_once "lib/sql.php";
require_once "lib/logging.php";
require_once "lib/normalizeString.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

$jsonData = file_get_contents("data.json");
$jsonData = json_decode($jsonData, true);

$returnVals = [];

if (!empty($_GET["initial_framework"]) && !empty($_GET["if_percentage"])) {
    $returnVals[$_GET["initial_framework"]] = $_GET["if_percentage"];
}


$keys = array_keys($jsonData);
while (count($returnVals) < 2) {
    $randomIndex = rand(0, count($keys) - 1);
    $framework = $keys[$randomIndex];

    if (!array_key_exists($framework, $returnVals)) {
        $returnVals[$framework] = $jsonData[$framework];
    }
}

if (count($returnVals) != 2) {
    echo json_encode(["Error" => "Count is not 2", "Output" => $returnVals]);
    die();
}

echo json_encode($returnVals);
