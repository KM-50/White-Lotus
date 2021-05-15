<?php
// Проверяем тип запроса, обрабатываем только POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Получаем параметры, посланные с javascript
    $phoneNumber = $_POST['phone-number'];

    // создаем переменную с содержанием письма
    $content = $phoneNumber . ' заказал обратный звонок.';

    // Первый параметр - кому отправляем письмо, второй - тема письма, третий - содержание
    $success = mail("callme@whitelotus.com", 'Запрос на обратный звонок', $content);

    if ($success) {
        // Отдаем 200 код ответа на http запрос
        http_response_code(200);
        echo "Письмо отправлено";
    } else {
        // Отдаем ошибку с кодом 500 (internal server error).
        http_response_code(500);
        echo "Письмо не отправлено";
    }

} else {
    // Если это не POST запрос - возвращаем код 403 (действие запрещено)
    http_response_code(403);
    echo "Данный метод запроса не поддерживается сервером";
}