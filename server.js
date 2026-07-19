const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Функция для определения типа контента (чтобы стили и шрифты загружались корректно)
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html': return 'text/html; charset=utf-8';
        case '.css': return 'text/css';
        case '.js': return 'text/javascript';
        case '.json': return 'application/json';
        case '.png': return 'image/png';
        case '.jpg': return 'image/jpeg';
        case '.ico': return 'image/x-icon';
        default: return 'application/octet-stream';
    }
}

const server = http.createServer((req, res) => {
    // Если запрашивают главный адрес, отдаем index.html
    let filePath = req.url === '/' 
        ? path.join(__dirname, 'public', 'index.html') 
        : path.join(__dirname, 'public', req.url);

    // Читаем файл с диска
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Если файл не найден, выдаем аккуратную 404 ошибку в стиле Metro
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<body style="background:#000;color:#fff;font-family:sans-serif;padding:40px"><h1>404: File Not Found</h1><p>Проверь, лежит ли файл index.html в папке public</p></body>');
            } else {
                // Любая другая системная ошибка
                res.writeHead(500);
                res.end(`Системная ошибка: ${error.code}`);
            }
        } else {
            // Если всё отлично, отдаем файл браузеру
            res.writeHead(200, { 'Content-Type': getContentType(filePath) });
            res.end(content, 'utf-8');
        }
    });
});

// Запуск прослушивания порта
server.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`  WinMarket Локальный Сервер запущен!`);
    console.log(`  Ссылка для браузера: http://localhost:${PORT}`);
    console.log(`==========================================`);
});
