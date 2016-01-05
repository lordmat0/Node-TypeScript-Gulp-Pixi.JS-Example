import {Test} from './test';


console.log(5);

var span = document.createElement('span');

span.textContent = 'new Test().num ' + new Test().num;

document.body.appendChild(span);

