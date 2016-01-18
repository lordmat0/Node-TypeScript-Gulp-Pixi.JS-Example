import {PlayerMovement} from '../../../shared/player-movement';
import {AfterBurnPhysics} from './after-burn.physics';
import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';

export class PlayerMovementPhysics {

    private afterBurnPhysics: AfterBurnPhysics;

    private leftController: KeyboardHandler;
    private rightController: KeyboardHandler;
    private upController: KeyboardHandler;
    private downController: KeyboardHandler;

    private THURST = 5;
    private REVERSE = -2;
    private TURN_RIGHT_SPEED = 0.05;
    private TURN_LEFT_SPEED = -0.05;

    constructor() {
        this.initControls();
        this.afterBurnPhysics = new AfterBurnPhysics();
    }

    calculateMovement(x: number, y: number, rotation: number): PlayerMovement {
        let radian = rotation % (Math.PI * 2);
        let impulse = 0;

        if (this.leftController.isDown) {
            radian += this.TURN_LEFT_SPEED;
            rotation += this.TURN_LEFT_SPEED;
        } else if (this.rightController.isDown) {
            radian += this.TURN_RIGHT_SPEED;
            rotation += this.TURN_RIGHT_SPEED;
        }

        if (this.upController.isDown) {
            impulse = this.THURST;
            this.afterBurnPhysics.startBurn();
        } else if (this.upController.isUp && this.afterBurnPhysics.isActive()) {
            impulse = this.afterBurnPhysics.getImpulse();
        } else if (this.downController.isDown) {
            impulse = this.REVERSE;
        }

        x += Math.cos(radian) * impulse;
        y += Math.sin(radian) * impulse;

        return {
            rotation: rotation,
            x: x,
            y: y
        }
    }

    private initControls(): void {
        this.leftController = new KeyboardHandler(KeyboardCode.LEFT);
        this.upController = new KeyboardHandler(KeyboardCode.UP);
        this.rightController = new KeyboardHandler(KeyboardCode.RIGHT);
        this.downController = new KeyboardHandler(KeyboardCode.DOWN);
    }

}
