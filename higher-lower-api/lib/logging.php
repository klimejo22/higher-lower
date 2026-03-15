<?php
require_once "db.php";
require_once "sql.php";

function logDb($message) {
    global $db;
    $message = explode(" - ", $message);
    if (!empty(query("INSERT INTO logging (msgType, msgContent, msgTime) VALUES (:t, :m, :d)", [
        ":t" => $message[1],
        ":m" => str_replace("\n", "", $message[2]),
        ":d" => $message[0]
    ]))) {
        return true;
    } else {
        return false;
    }
}

function logMsg($log, $message, $filename = null) {
    global $db;
    
    if (file_exists($log)) {
        if (is_writable($log)) {
            if (!($fp = fopen($log, 'a+'))) {
                return false;
            } else {
                if ($filename == null ) {
                    $fmsg = date('h:i:s a d/m/Y', time()).' - '.$message."\n";
                } else {
                    $fmsg = date('h:i:s a d/m/Y', time()).' - '.$message.' at '.$filename."\n";
                }
                if ((fwrite($fp, $fmsg) === FALSE)) {
                    return false;    
                } else {
                    return logDb($fmsg);
                }
            }
        } else {
            return false;
        }
    } else {
        fopen($log, 'a+');
        logMsg($log, $message, $filename);
    }
}




?>