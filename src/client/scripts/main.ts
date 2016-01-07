import {Test} from './test';


var span = document.createElement('span');

span.textContent = 'new Test().num ' + new Test().num;

document.body.appendChild(span);

var socket = io();

var callCount = 0;

setInterval(() => {
    console.log('event');
    socket.emit('event', ++callCount);
}, 1000);
 