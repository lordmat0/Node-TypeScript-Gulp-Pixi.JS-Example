import * as PIXI from 'pixi.js';
import {Game} from './game';

// Create the renderer
let renderer = PIXI.autoDetectRenderer(512, 512);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game();
game.init();

gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.state();

    renderer.render(game.stage);
}
