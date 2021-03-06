import {KeyboardCode} from './keyboard-code';

export class KeyboardHandler {

    press: Function;
    release: Function;
    isDown = false;
    isUp = true;

    constructor(private keycode: KeyboardCode) {
        window.addEventListener('keydown', this.downHandler.bind(this), false);
        window.addEventListener('keyup', this.upHandler.bind(this), false);
    }

    private downHandler(event) {
        if (event.keyCode === this.keycode) {
            if (this.isUp && this.press) {
                this.press();
            }
            this.isDown = true;
            this.isUp = false;
        }

        event.preventDefault();
    }

    private upHandler(event) {
        if (event.keyCode === this.keycode) {
            if (this.isDown && this.release) {
                this.release();
            }
            this.isDown = false;
            this.isUp = true;
        }
        event.preventDefault();
    }
}
