<?php

function HashPassword($password) {
    $password = strrev($password);
    $password .= "HLProjektFinal";
    $password = hash("sha512", $password);
    return $password;
}