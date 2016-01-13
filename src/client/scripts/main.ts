import * as PIXI from 'pixi.js';
import {Game} from './game';
import {KeyboardHandler} from './util/keyboard-handler';
import {KeyboardCode} from './util/keyboard-code';

// Create the renderer
let renderer = PIXI.autoDetectRenderer(512, 512);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game();
game.init();

gameLoop();

let keyboardHandler = new KeyboardHandler(KeyboardCode.TAB);

keyboardHandler.press = () => {
    console.log('left pressed');
};

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.state();

    renderer.render(game.stage);
}
