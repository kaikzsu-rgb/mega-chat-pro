const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { maxHttpBufferSize: 1e7 }); // Для больших фото
const db = new sqlite3.Database('./database.db');

db.run(`CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, text TEXT, image TEXT, time TEXT)`);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    db.all("SELECT * FROM messages ORDER BY id DESC LIMIT 50", [], (err, rows) => {
        if (!err) socket.emit('load history', rows.reverse());
    });

    socket.on('chat message', (data) => {
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        db.run("INSERT INTO messages (name, text, image, time) VALUES (?, ?, ?, ?)", 
        [data.name, data.text, data.image, time], function(err) {
            if (!err) {
                io.emit('chat message', { id: this.lastID, name: data.name, text: data.text, image: data.image, time: time });
            }
        });
    });

    socket.on('delete message', (id) => {
        db.run("DELETE FROM messages WHERE id = ?", id, () => io.emit('message deleted', id));
    });

    socket.on('typing', (data) => socket.broadcast.emit('user typing', data));
});

server.listen(3000, () => console.log('🔥 СЕРВЕР ЗАПУЩЕН НА ПОРТУ 3000'));