import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';
import {Square} from '../../../shared/square';

export class SquareGraphic extends PIXI.Graphics implements Square {

    id: string;
    vx = 0;
    vy = 0;

    constructor(public player = false) {
        super();
        this.init();
    }

    private init(): void {
        this.initShape();
        if (this.player) {
            this.initControls();
        }
    }

    private initShape(): void {
        this.lineStyle(4, 0xFF3300, 1);
        this.beginFill(0x66CCFF);
        this.drawRect(0, 0, 32, 32);
        this.endFill();
        this.x = 170;
        this.y = 170;
    }

    private initControls(): void {
        let left = new KeyboardHandler(KeyboardCode.LEFT);
        let up = new KeyboardHandler(KeyboardCode.UP);
        let right = new KeyboardHandler(KeyboardCode.RIGHT);
        let down = new KeyboardHandler(KeyboardCode.DOWN);

        console.log(this);

        left.press = function() {
            this.vx = -5;
        }.bind(this);

        left.release = function() {
            if (!right.isDown) {
                this.vx = 0;
            }
        }.bind(this);

        up.press = function() {
            this.vy = -5;
        }.bind(this);

        up.release = function() {
            if (!down.isDown) {
                this.vy = 0;
            }
        }.bind(this);

        right.press = function() {
            this.vx = 5;
        }.bind(this);

        right.release = function() {
            if (!left.isDown) {
                this.vx = 0;
            }
        }.bind(this);

        down.press = function() {
            this.vy = 5;
        }.bind(this);

        down.release = function() {
            if (!up.isDown) {
                this.vy = 0;
            }
        }.bind(this);
    }
}
