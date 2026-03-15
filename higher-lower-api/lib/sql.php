<?php
require_once "db.php";
require_once "logging.php";
require_once "var_dump_plus.php";


function query(string $sql, array $args = []) {
    global $db;
    $sql = $db->prepare($sql);
    try {
        if ($sql->execute($args)) {
            return $sql;
        } else {

            return array();
        }
    } catch (PDOException $e) {
        return $e;
    }
     
}