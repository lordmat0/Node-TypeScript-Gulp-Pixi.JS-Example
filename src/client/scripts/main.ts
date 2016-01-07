import * as PIXI from 'pixi.js';
import {Test} from './test';

// Create the renderer
var renderer = PIXI.autoDetectRenderer(512, 512);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);


// Create a container object called the `stage`
var stage = new PIXI.Container();


let rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 32, 32);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
stage.addChild(rectangle);

// Tell the `renderer` to `render` the `stage`
renderer.render(stage);

