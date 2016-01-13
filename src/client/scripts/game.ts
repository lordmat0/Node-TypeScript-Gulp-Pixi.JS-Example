import {Rectangle} from './graphics/rectangle';
import {KeyboardHandler} from './util/keyboard-handler';
import {KeyboardCode} from './util/keyboard-code';

export class Game {

    baseContainer: PIXI.Container;

    private rectangle: Rectangle;

    init() {
        this.rectangle = new Rectangle();

        this.baseContainer = new PIXI.Container();
        this.baseContainer.addChild(this.rectangle);

        let left = new KeyboardHandler(KeyboardCode.LEFT);
        let up = new KeyboardHandler(KeyboardCode.UP);
        let right = new KeyboardHandler(KeyboardCode.RIGHT);
        let down = new KeyboardHandler(KeyboardCode.DOWN);

        left.press = function() {
            this.rectangle.vx = -5;
            this.rectangle.vy = 0;
        }.bind(this);

        left.release = function() {
            if (!right.isDown && this.rectangle.vy === 0) {
                this.rectangle.vx = 0;
            }
        }.bind(this);

        up.press = function() {
            this.rectangle.vy = -5;
            this.rectangle.vx = 0;
        }.bind(this);

        up.release = function() {
            if (!down.isDown && this.rectangle.vx === 0) {
                this.rectangle.vy = 0;
            }
        }.bind(this);

        right.press = function() {
            this.rectangle.vx = 5;
            this.rectangle.vy = 0;
        }.bind(this);

        right.release = function() {
            if (!left.isDown && this.rectangle.vy === 0) {
                this.rectangle.vx = 0;
            }
        }.bind(this);

        down.press = function() {
            this.rectangle.vy = 5;
            this.rectangle.vx = 0;
        }.bind(this);

        down.release = function() {
            if (!up.isDown && this.rectangle.vx === 0) {
                this.rectangle.vy = 0;
            }
        }.bind(this);
    }

    state() {
        this.rectangle.x += this.rectangle.vx;
        this.rectangle.y += this.rectangle.vy;
    }

    get stage(): PIXI.Container {
        return this.baseContainer;
    }
}
