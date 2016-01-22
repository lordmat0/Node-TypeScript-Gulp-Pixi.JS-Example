import {FiringPhysics} from '../physics/firing.physics';
import {BulletMovement} from '../../../shared/bullet-movement';
import {BulletPhysics} from '../physics/bullet.physics';

export class PlayerGraphic extends PIXI.Graphics {
    private SIZE = 32;
    private firingPhysics: FiringPhysics;
    private bulletPhysics: BulletPhysics;

    constructor() {
        super();
        this.initShape();
        this.firingPhysics = new FiringPhysics();
        this.bulletPhysics = new BulletPhysics();
    }

    isShooting(): boolean {
        return this.firingPhysics.canShoot();
    }

    getBulletInfo(): BulletMovement {
        return {
            id: this.name,
            rotation: this.rotation,
            x: this.x,
            y: this.y
        };
    }

    private initShape(): void {
        this.pivot = new PIXI.Point(this.SIZE / 2, this.SIZE / 2);

        let lineStyle = 0x66CCFF;
        let fillColor = 0x7F9A65;

        this.lineStyle(4, lineStyle, 1);

        // Body
        this.beginFill(fillColor);
        this.drawRect(0, 0, this.SIZE, this.SIZE);
        this.endFill();

        // Top wing
        this.moveTo(0, 0);
        this.lineTo(-1, -32);
        this.lineTo(32, 0);
        this.endFill();

        // Bottom wing
        this.moveTo(0, this.SIZE);
        this.lineTo(-1, 32 + this.SIZE);
        this.lineTo(this.SIZE, this.SIZE);
        this.endFill();
    }

}
