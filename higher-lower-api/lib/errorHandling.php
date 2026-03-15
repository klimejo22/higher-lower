<?php
function API_handleEndpointError($e, $errorcode) {
    http_response_code($errorcode);
    echo json_encode(["error" => $e]);
    exit;
}