import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';

export class PlayerGraphic extends PIXI.Graphics {

    id: string;
    vx = 0;
    vy = 0;
    vrotation = 0;

    private SIZE = 32;

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
        let left = new KeyboardHandler(KeyboardCode.LEFT);
        let up = new KeyboardHandler(KeyboardCode.UP);
        let right = new KeyboardHandler(KeyboardCode.RIGHT);
        let down = new KeyboardHandler(KeyboardCode.DOWN);

        left.press = function() {
            this.vrotation = -0.09;
        }.bind(this);

        left.release = function() {
            if (!right.isDown) {
                this.vrotation = 0;
            }
        }.bind(this);

        right.press = function() {
            this.vrotation = 0.09;
        }.bind(this);

        right.release = function() {
            if (!left.isDown) {
                this.vrotation = 0;
            }
        }.bind(this);

        up.press = function() {
            this.vy = -5;
        }.bind(this);

        up.release = function() {
            if (!down.isDown) {
                this.vy = 0;
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
