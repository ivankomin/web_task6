<?php
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data !== null) {
    if (file_put_contents('data.json', $json)) {
        echo json_encode(['status' => 'success']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Не вдалося записати файл']);
    }
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Невірний JSON']);
}
?>