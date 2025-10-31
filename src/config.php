<?php
/**
 * Конфигурационный файл для обработки формы
 */

return [
    // Email настройки
    'email' => [
        // Адрес получателя
        'to' => 'perchik.des@gmail.com',
        
        // Тема письма
        'subject' => 'Новое сообщение с сайта ServiceLab',
        
        // Email отправителя (для заголовка From)
        'from' => 'noreply@servicelab.ru',
        
        // Имя отправителя
        'from_name' => 'ServiceLab Website',
    ],
    
    // CORS настройки (если фронтенд на другом домене)
    'cors' => [
        'allowed_origins' => ['*'], // Измените на конкретные домены в production
    ],
    
    // Настройки безопасности
    'security' => [
        // Максимальная длина сообщения
        'max_message_length' => 5000,
        
        // Обязательные поля
        'required_fields' => ['name', 'email', 'message'],
    ],
];
