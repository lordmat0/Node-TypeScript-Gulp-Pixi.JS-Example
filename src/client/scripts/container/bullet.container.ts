import {BulletGraphic} from '../graphics/bullet.graphic';
import {BulletMovement} from '../../../shared/bullet-movement';
import {BulletPhysics} from '../physics/bullet.physics';

export class BulletContainer extends PIXI.Container {

    private bulletPhysics: BulletPhysics;

    constructor() {
        super();
        this.bulletPhysics = new BulletPhysics();
    }

    tick(): void {
        for (let i in this.children) {
            if (this.children.hasOwnProperty(i)) {
                let bulletGraphic = <BulletGraphic>this.children[i];
                let bulletMovement = this.bulletPhysics.calculateBullet(bulletGraphic.x, bulletGraphic.y, bulletGraphic.rotation);
                bulletGraphic.x = bulletMovement.x;
                bulletGraphic.y = bulletMovement.y;
                bulletGraphic.rotation = bulletMovement.rotation;
            }
        }


        // move bullets

        // a way to check if bullets have hit anything?

        // Remove bullets that are out of bounds
    }

    addBullet(bulletMovement: BulletMovement): void {
        let x = bulletMovement.x;
        let y = bulletMovement.y;
        let rotation = bulletMovement.rotation;
        this.addChild(new BulletGraphic(x, y, rotation));
    }

    // private outOfBounds(bullet: BulletGraphic): boolean {
    //     return false;
    // }

}
