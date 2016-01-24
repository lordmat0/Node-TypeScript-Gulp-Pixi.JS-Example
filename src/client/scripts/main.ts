import {RenderDetails} from './render-details';
import {Game} from './game';
import * as PIXI from 'pixi.js';

// Create the renderer
let renderDetails = new RenderDetails();
let renderer = PIXI.autoDetectRenderer(renderDetails.x, renderDetails.y);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game(renderDetails);

gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.state();

    renderer.render(game.stage);
}
