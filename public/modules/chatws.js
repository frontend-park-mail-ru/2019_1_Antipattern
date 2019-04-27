'use strict'

let socket = new WebSocket("ws://chat.kpacubo.xyz:2000/ws");
    
socket.onopen = function() {
    console.log("Соединение установлено.");
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
    //alert("Получены данные " + event.data);
    let msg = JSON.parse(event.data);
    let p = document.createElement("p");
    p.innerText = msg.uid + ":" + msg.text;
    document.getElementById("text-field").appendChild(p);
};

socket.onerror = function(error) {
    console.log("Ошибка " + error.message);
};

export function sendMsg(msg) {
    socket.send(JSON.stringify( { text : msg } ));
}

