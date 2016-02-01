import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';

// todo rename
export class FiringPhysics {

    private bulletsOut = 0;
    private MAX_BULLETS_OUT = 1200;
    private spaceController: KeyboardHandler;

    constructor() {
        this.spaceController = new KeyboardHandler(KeyboardCode.SPACE);
    }

    isShooting(): boolean {
        if (this.spaceController.isDown && this.bulletsOut <= this.MAX_BULLETS_OUT) {
            this.shot();
            return true;
        } else {
            this.recharge();
            return false;
        }
    }

    private shot(): void {
        this.bulletsOut += 600;
    }

    private recharge(): void {
        if (this.bulletsOut >= 0) {
            this.bulletsOut -= 50;
        }
    }

}
