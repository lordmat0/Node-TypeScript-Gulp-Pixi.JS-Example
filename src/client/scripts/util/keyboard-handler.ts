export class KeyboardHandler {

    press: Function;
    release: Function;

    private isDown = false;
    private isUp = true;

    constructor(private keycode: number) {
        window.addEventListener('keydown', this.downHandler.bind(this), false);
        window.addEventListener('keyup', this.upHandler.bind(this), false);
    }

    downHandler(event) {
        if (event.keyCode === this.keycode) {
            if (this.isUp && this.press) {
                this.press();
            }
            this.isDown = true;
            this.isUp = false;
        }

        event.preventDefault();
    }

    upHandler(event) {
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
