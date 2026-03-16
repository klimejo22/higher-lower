<?php

function HashPassword($password) {
    $password = strrev($password);
    $password .= "HLProjektFinal";
    $password = hash("sha512", $password);
    return $password;
}

function generateToken() {
    $token = "";
    for ($i=0; $i < 6; $i++) { 
        $token .= rand(0, 9);
    }

    return HashPassword($token);
}