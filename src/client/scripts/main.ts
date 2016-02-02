import {RenderDetails} from '../../shared/render-details';
import {Game} from './game';

// Create the renderer
let renderDetails = new RenderDetails();
let renderer = PIXI.autoDetectRenderer(renderDetails.width, renderDetails.height);
renderDetails.render = renderer;

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game(renderDetails);

gameLoop();

function gameLoop(ts?: number) {
    requestAnimationFrame(gameLoop);
    game.state();

    // console.log(ts);

    renderer.render(game.stage);
}
