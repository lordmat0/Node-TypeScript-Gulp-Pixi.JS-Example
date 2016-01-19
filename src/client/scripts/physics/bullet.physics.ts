// import {KeyboardHandler} from '../util/keyboard-handler';
import {BulletMovement} from '../../../shared/bullet-movement';

export class BulletPhysics {

    private SPEED = 10;

    calculateBullet(x: number, y: number, rotation: number): BulletMovement {
        let radian = rotation % (Math.PI * 2);

        x += Math.cos(radian) * this.SPEED;
        y += Math.sin(radian) * this.SPEED;

        return {
            rotation: rotation,
            x: x,
            y: y
        };
    }

}
