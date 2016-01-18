import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';
import {PlayerMovement} from '../../../shared/player-movement';
import {AfterBurnPhysics} from '../physics/after-burn.physics';

export class PlayerGraphic extends PIXI.Graphics {

    id: string;
    vx = 0;
    vy = 0;
    vrotation = 0;

    private leftController: KeyboardHandler;
    private rightController: KeyboardHandler;
    private upController: KeyboardHandler;
    private downController: KeyboardHandler;


    private SIZE = 32;
    private THURST = 5;
    private REVERSE = -2;
    private TURN_RIGHT_SPEED = 0.05;
    private TURN_LEFT_SPEED = -0.05;

    private afterBurnPhysics: AfterBurnPhysics;

    constructor(public player = false) {
        super();
        this.init();
    }

    getMovementInfo(): PlayerMovement {
        let radian = this.rotation % (Math.PI * 2);
        let impulse = 0;

        if (this.leftController.isDown) {
            radian += this.TURN_LEFT_SPEED;
            this.rotation += this.TURN_LEFT_SPEED;
        } else if (this.rightController.isDown) {
            radian += this.TURN_RIGHT_SPEED;
            this.rotation += this.TURN_RIGHT_SPEED;
        }

        if (this.upController.isDown) {
            impulse = this.THURST;
            this.afterBurnPhysics.startBurn();
        } else if (this.upController.isUp && this.afterBurnPhysics.isActive()) {
            impulse = this.afterBurnPhysics.getImpulse();
        } else if (this.downController.isDown) {
            impulse = this.REVERSE;
        }

        this.x += Math.cos(radian) * impulse;
        this.y += Math.sin(radian) * impulse;

        return {
            rotation: this.rotation,
            x: this.x,
            y: this.y
        };
    }

    private init(): void {
        this.initShape();
        if (this.player) {
            this.initControls();
            this.initPhysics();
        }
    }

    private initShape(): void {
        this.pivot = new PIXI.Point(this.SIZE / 2, this.SIZE / 2);

        let lineStyle = 0xFF3300;
        let fillColor = 0x66CCFF;
        if (this.player) {
            lineStyle = 0x66CCFF;
            fillColor = 0x7F9A65;
        }

        this.lineStyle(4, lineStyle, 1);
        this.beginFill(fillColor);

        this.drawRect(0, 0, this.SIZE, this.SIZE);
        this.endFill();
        this.x = 170;
        this.y = 170;
    }

    private initControls(): void {
        this.leftController = new KeyboardHandler(KeyboardCode.LEFT);
        this.upController = new KeyboardHandler(KeyboardCode.UP);
        this.rightController = new KeyboardHandler(KeyboardCode.RIGHT);
        this.downController = new KeyboardHandler(KeyboardCode.DOWN);
    }

    public initPhysics(): void {
        this.afterBurnPhysics = new AfterBurnPhysics();
    }

}
