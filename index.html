function selectRoom(id, title) {
            currentRoom = id;
            document.getElementById('chat-header').innerText = title;
            document.getElementById('messages').innerHTML = ''; // Очистка при смене
            socket.emit('get-history', id);
        }

        function send() {
            const input = document.getElementById('msgInput');
            if(!input.value.trim()) return;

            const data = {
                room: currentRoom,
                user: currentUser.name,
                text: input.value,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
            };

            socket.emit('message', data);
            input.value = '';
        }

        socket.on('message', (msg) => {
            const div = document.createElement('div');
            div.className = `msg ${msg.user === currentUser.name ? 'my' : 'bot'}`;
            div.innerHTML = `
                <span class="sender">${msg.user}</span>
                ${msg.text}
                <div style="font-size:10px; text-align:right; opacity:0.6;">${msg.time}</div>
            `;
            const box = document.getElementById('messages');
            box.appendChild(div);
            box.scrollTop = box.scrollHeight;
        });

        function checkEnter(e) { if(e.key === 'Enter') send(); }
        function toggleMenu() { alert('Меню создания: Группы, Каналы, Контакты'); }
    </script>
</body>
</html>
