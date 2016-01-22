import {PlayerMovement} from '../../../shared/player-movement';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {FiringPhysics} from '../physics/firing.physics';
import {BulletMovement} from '../../../shared/bullet-movement';
import {BulletPhysics} from '../physics/bullet.physics';

export class PlayerGraphic extends PIXI.Graphics {
    // TODO change this to name
    id: string;

    private SIZE = 32;
    private playerMovementPhysics: PlayerMovementPhysics;
    private firingPhysics: FiringPhysics;
    private bulletPhysics: BulletPhysics;

    constructor() {
        super();
        this.initShape();
        this.playerMovementPhysics = new PlayerMovementPhysics();
        this.firingPhysics = new FiringPhysics();
        this.bulletPhysics = new BulletPhysics();
    }

    getMovementInfo(): PlayerMovement {
        let playerMovement = this.playerMovementPhysics.calculate(this.x, this.y, this.rotation);
        this.x = playerMovement.x;
        this.y = playerMovement.y;
        this.rotation = playerMovement.rotation;

        return playerMovement;
    }

    isShooting(): boolean {
        return this.firingPhysics.canShoot();
    }

    getBulletInfo(): BulletMovement {
        return {
            id: this.id,
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

        // Starting coordinates
        this.x = 170;
        this.y = 170;
    }

}
