import {FiringPhysics} from '../physics/firing.physics';
import {BulletPhysics} from '../physics/bullet.physics';

export class PlayerGraphic extends PIXI.Graphics {
    HIT_BOX_SIZE = 32;
    private firingPhysics: FiringPhysics;
    private bulletPhysics: BulletPhysics;

    constructor() {
        super();
        this.initShape();
        this.firingPhysics = new FiringPhysics();
        this.bulletPhysics = new BulletPhysics();
    }

    isShooting(): boolean {
        return this.firingPhysics.isShooting();
    }



    private initShape(): void {
        let size = this.HIT_BOX_SIZE;

        this.pivot = new PIXI.Point(size / 2, size / 2);

        let lineStyle = 0x66CCFF;
        let fillColor = 0x7F9A65;

        this.lineStyle(4, lineStyle, 1);

        // Body
        this.beginFill(fillColor);
        this.drawRect(0, 0, size, size);
        this.endFill();

        // Top wing
        this.moveTo(0, 0);
        this.lineTo(-1, -size);
        this.lineTo(size, 0);
        this.endFill();

        // Bottom wing
        this.moveTo(0, size);
        this.lineTo(-1, size * 2);
        this.lineTo(size, size);
        this.endFill();
    }

}
