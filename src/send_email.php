<?php
/**
 * Обработчик формы обратной связи
 * Принимает POST запрос и отправляет email
 */

// Загрузка конфигурации
$config = require_once __DIR__ . '/config.php';

// Установка заголовков для JSON ответа
header('Content-Type: application/json; charset=utf-8');

// CORS заголовки (если требуется)
if (isset($config['cors']['allowed_origins'])) {
    $allowed = $config['cors']['allowed_origins'];
    if (in_array('*', $allowed)) {
        header('Access-Control-Allow-Origin: *');
    } else {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        if (in_array($origin, $allowed)) {
            header('Access-Control-Allow-Origin: ' . $origin);
        }
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

// Обработка preflight запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Метод не разрешен. Используйте POST запрос.'
    ]);
    exit;
}

// Функция для очистки входных данных
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Функция для валидации email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Получение данных из POST запроса
$name = isset($_POST['name']) ? cleanInput($_POST['name']) : '';
$email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
$phone = isset($_POST['phone']) ? cleanInput($_POST['phone']) : '';
$message = isset($_POST['message']) ? cleanInput($_POST['message']) : '';

// Массив ошибок
$errors = [];

// Проверка обязательных полей
foreach ($config['security']['required_fields'] as $field) {
    if (empty($$field)) {
        $errors[] = "Поле '$field' обязательно для заполнения";
    }
}

// Валидация email
if (!empty($email) && !validateEmail($email)) {
    $errors[] = 'Некорректный email адрес';
}

// Проверка длины сообщения
if (strlen($message) > $config['security']['max_message_length']) {
    $errors[] = 'Сообщение слишком длинное';
}

// Если есть ошибки, возвращаем их
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка валидации данных',
        'errors' => $errors
    ]);
    exit;
}

// Формирование тела письма
$emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 5px 5px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #667eea; }
        .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #667eea; }
        .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin: 0;'>Новое сообщение с сайта ServiceLab</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Имя:</div>
                <div class='value'>" . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</div>
            </div>
            
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'><a href='mailto:" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "'>" . htmlspecialchars($email, ENT_QUOTES, 'UTF-8') . "</a></div>
            </div>
            
            " . (!empty($phone) ? "
            <div class='field'>
                <div class='label'>Телефон:</div>
                <div class='value'>" . htmlspecialchars($phone, ENT_QUOTES, 'UTF-8') . "</div>
            </div>
            " : "") . "
            
            <div class='field'>
                <div class='label'>Сообщение:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>Отправлено: " . date('d.m.Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Формирование заголовков письма
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: ' . $config['email']['from_name'] . ' <' . $config['email']['from'] . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

// Отправка письма
$mailSent = mail(
    $config['email']['to'],
    $config['email']['subject'],
    $emailBody,
    implode("\r\n", $headers)
);

// Возврат результата
if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Ошибка при отправке сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами другим способом.'
    ]);
}
