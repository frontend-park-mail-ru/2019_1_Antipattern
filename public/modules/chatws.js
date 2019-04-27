'use strict';

import apiModule from './api.js';
import {dispatchAdapter} from "./dispatcher.js";

let socket = new WebSocket("wss://chat.kpacubo.xyz:2000/ws");

socket.onopen = function () {
    console.log("Соединение установлено.");
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function(event) {
    // alert("Получены данные " + event.data);
    let msg = JSON.parse(event.data);
    console.log("MESSAGE:", msg);
    let p = document.createElement('p');
    let img = document.createElement('img');
    if (msg.uid !== '') {
        apiModule.getUserById(msg.uid)
        .then((payload) => {
            dispatchAdapter.dispatchEvent('Msg', {
                text: payload.login + ':' + msg.text,
            });
            // p.innerText = payload.login + ':' + msg.text;
            // document.getElementById('text-field').appendChild(p);
        })
    } else {
        dispatchAdapter.dispatchEvent('Msg', {
            text: payload.anon + ':' + msg.text,
        });
        // p.innerText = 'anon' + ':' + msg.text;
        // document.getElementById('text-field').appendChild(p);
    }
};

socket.onerror = function (error) {
    console.log('Ошибка ' + error.message);
};

export function sendMsg(msg) {
    socket.send(JSON.stringify({ text: msg }));
}

