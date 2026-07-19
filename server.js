const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

http.createServer((req, res) => {
    // Сервер ищет файл прямо в той папке, откуда его запустили
    let filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <body style="background:#111; color:#fff; font-family:sans-serif; padding:40px;">
                    <h1 style="color:#ff3333">Файл не найден (404)</h1>
                    <p>Я ищу твой файл <b>index.html</b> вот по этому точному пути:</p>
                    <code style="background:#222; padding:10px; display:block; border-left:4px solid #ff3333; color:#00adb5;">
                        ${filePath}
                    </code>
                    <p style="margin-top:20px;">Перенеси свой <b>index.html</b> именно в эту папку и обнови страницу!</p>
                </body>
            `);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        }
    });
}).listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
