import {PlayerDamagePhysics} from '../physics/player-damage.physics';
import {FiringPhysics} from '../physics/firing.physics';
import {BulletPhysics} from '../physics/bullet.physics';

export class PlayerGraphic extends PIXI.Graphics {
    HIT_BOX_SIZE = 32;
    private firingPhysics: FiringPhysics;
    private bulletPhysics: BulletPhysics;
    private playerDamagePhysics: PlayerDamagePhysics;

    private healthColor: number;

    constructor() {
        super();
        this.healthColor = 0x003300;
        this.initShape();

        this.firingPhysics = new FiringPhysics();
        this.bulletPhysics = new BulletPhysics();
        this.playerDamagePhysics = new PlayerDamagePhysics();
    }

    isShooting(): boolean {
        return this.firingPhysics.isShooting();
    }

    takeDamage(): void {
        this.healthColor = this.playerDamagePhysics.calculateHit(this.healthColor);

        this.beginFill(this.healthColor);
        this.drawRect(0, 0, this.HIT_BOX_SIZE, this.HIT_BOX_SIZE);
        this.endFill();
    }

    recoverHealth(): void {
        this.healthColor = this.playerDamagePhysics.calculateRecovery(this.healthColor);
    }

    isDead(): boolean {
        return this.playerDamagePhysics.calculateDamagePercentage(this.healthColor) >= 1;
    }

    private initShape(): void {
        let size = this.HIT_BOX_SIZE;

        this.pivot = new PIXI.Point(size / 2, size / 2);

        let lineStyle = 0x66CCFF;

        this.lineStyle(4, lineStyle, 1);

        // Body
        this.beginFill(this.healthColor);
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
