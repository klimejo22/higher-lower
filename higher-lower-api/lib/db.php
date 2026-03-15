<?php
// define = vytvoreni konstanty
define('DB_NAME', 'd315069_metrodb');
define('DB_USER', 'a315069_metrodb');
define('DB_PASSWORD', 'Abcdef0_');
define('DB_HOST', 'md393.wedos.net');

global $db;
$db = new PDO(
        "mysql:host=" .DB_HOST. ";dbname=" .DB_NAME,DB_USER,DB_PASSWORD,
        array(
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
        )
);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
?>