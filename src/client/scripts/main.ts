import * as PIXI from 'pixi.js';
import {Test} from './test';

console.log(PIXI);

// Create the renderer
var renderer = PIXI.autoDetectRenderer(512, 512);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);


// Create a container object called the `stage`
var stage = new PIXI.Container();

// Tell the `renderer` to `render` the `stage`
renderer.render(stage);

console.log(new Test().num);
