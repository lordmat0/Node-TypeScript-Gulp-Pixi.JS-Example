import {BulletMovement} from '../../../shared/bullet-movement';
import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';

// todo rename
export class FiringPhysics {

    private bulletsShot = 0;
    private MAX_BULLETS_OUT = 10;
    private spaceController: KeyboardHandler;

    constructor() {
        this.spaceController = new KeyboardHandler(KeyboardCode.SPACE);
    }

    canShoot(): boolean {
        return this.bulletsShot < this.MAX_BULLETS_OUT
            && this.spaceController.isDown;
    }

    bulletInfo(): BulletMovement {
        return null;
    }

}
