import {RenderDetails} from '../../shared/render-details';
import {Game} from './game';

// Create the renderer
let renderDetails = new RenderDetails();
let renderer = PIXI.autoDetectRenderer(renderDetails.width, renderDetails.height);

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game(renderDetails);

gameLoop();

function gameLoop() {
    requestAnimationFrame(gameLoop);

    game.state();

    renderer.render(game.stage);
}
