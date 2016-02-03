import {RenderDetails} from '../../shared/render-details';
import {Game} from './game';

// Create the renderer
let renderDetails = new RenderDetails();
let renderer = PIXI.autoDetectRenderer(renderDetails.width, renderDetails.height);
renderDetails.render = renderer;

let canvas = document.getElementById('canvas');
canvas.appendChild(renderer.view);

let game = new Game(renderDetails);

let fpsStats = new Stats();
fpsStats.setMode(0); // 0: fps, 1: ms

// Align top-left
document.body.appendChild(fpsStats.domElement);
fpsStats.domElement.style.position = 'absolute';
fpsStats.domElement.style.left = '0px';
fpsStats.domElement.style.top = '0px';

gameLoop();

function gameLoop(ts?: number) {
    fpsStats.begin();


    requestAnimationFrame(gameLoop);
    game.state();

    // console.log(ts);

    renderer.render(game.stage);

    fpsStats.end();
}
