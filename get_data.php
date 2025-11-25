<?php
// get_data.php
header('Content-Type: application/json');

// Перевіряємо, чи існує файл
if (file_exists('data.json')) {
    echo file_get_contents('data.json');
} else {
    echo "[]";
}
?>