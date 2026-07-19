const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Указываем папку 'public' для отдачи статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Запуск сервера
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(` WinMarket Server запущен успешно!`);
    console.log(` Ссылка: http://localhost:${PORT}`);
    console.log(`==========================================`);
});