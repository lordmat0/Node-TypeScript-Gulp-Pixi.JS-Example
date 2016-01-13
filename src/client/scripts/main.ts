import * as PIXI from 'pixi.js';
import {Game} from './game';
import {KeyboardHandler} from "./util/keyboard-handler";

// Create the renderer
let renderer = PIXI.autoDetectRenderer(512, 512);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game();
game.init();

gameLoop();

let KeyboardHandler = new KeyboardHandler(37);

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.state();

    renderer.render(game.stage);
}
