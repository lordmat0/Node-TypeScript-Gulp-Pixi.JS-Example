import {BulletGraphic} from '../graphics/bullet.graphic';
import {BulletMovement} from '../../../shared/bullet-movement';

export class BulletContainer extends PIXI.Container {

    private bullets: BulletGraphic[] = [];

    tick(): void {
        // move bullets

        // a way to check if bullets have hit anything?

        // Remove bullets that are out of bounds
    }

    addBullet(bulletMovement: BulletMovement): void {
        // this.bullets.push(new BulletGraphic(5, 4));
        this.addChild(new BulletGraphic(5, 4));
    }


}
