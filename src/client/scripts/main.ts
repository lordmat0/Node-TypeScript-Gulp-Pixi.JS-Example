import {Test} from './test';


let span = document.createElement('span');

span.textContent = 'new Test().num ' + new Test().num;

document.body.appendChild(span);

let socket = io();

let callCount = 0;

setInterval(() => {
    console.log('event');
    socket.emit('event', ++callCount);
}, 1000);
