import {CollisionDetail} from '../../../shared/collision-detail';
import {CollisionDetection} from '../util/collision-detection';
import {BulletPhysics} from '../physics/bullet.physics';
import {RenderDetails} from '../render-details';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerGraphic} from '../graphics/player.graphic';
import {PlayerMovement} from '../../../shared/player-movement';

export class PlayerContainer extends PIXI.Container {
    onMove = 'on-move';
    onShot = 'on-shot';

    private playerMovementPhysics: PlayerMovementPhysics;
    private bulletPhysics: BulletPhysics;
    private playerGraphic: PlayerGraphic;
    private collisionDetection: CollisionDetection;

    private hitBox: PIXI.Graphics;

    constructor(private renderDetails: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();

        this.playerMovementPhysics = new PlayerMovementPhysics();
        this.bulletPhysics = new BulletPhysics();

        this.playerGraphic = new PlayerGraphic();

        this.collisionDetection = new CollisionDetection();

        this.x = renderDetails.halfWidth;
        this.y = renderDetails.halfHeight;

        this.addChild(this.playerGraphic);

        this.hitBox = new PIXI.Graphics();
    }

    tick(): void {
        this.getMovementInfo();
        this.getBulletInfo();
    }

    handleHits(bullets: CollisionDetail[]) {
        let shipSize = this.playerGraphic.SIZE;

        let collisionDetail: CollisionDetail = {
            height: shipSize,
            name: 'not sure',
            width: shipSize,
            x: this.x - (shipSize / 2),
            y: this.y - (shipSize / 2)
        };




        bullets.forEach((bullet: CollisionDetail) => {
            if (this.collisionDetection.rectangleHasHit(collisionDetail, bullet)) {
                console.log('hit');
            } else {
                // console.log('miss');
            }
        });
    }

    private getBulletInfo(): void {
        if (this.playerGraphic.isShooting()) {
            this.emit(this.onShot,
                this.bulletPhysics.calculateBullet(this.x, this.y, this.rotation));
        }
    }

    private getMovementInfo(): void {
        let playerMovement = this.playerMovementPhysics.calculate(this.x, this.y, this.rotation);

        if (this.hasMoved(playerMovement)) {
            this.x = playerMovement.x;
            this.y = playerMovement.y;
            this.rotation = playerMovement.rotation;

            this.showHitBox();

            this.emit(this.onMove, playerMovement);
        }
    }

    private hasMoved(movement: PlayerMovement): boolean {
        return this.x !== movement.x || this.y !== movement.y || this.rotation !== movement.rotation;
    }

    private initSocket() {
        this.on(this.onMove, this.socket.emit.bind(this.socket, 'player-movement'));
    }

    private showHitBox(): void {
        this.removeChild(this.hitBox);

        this.hitBox = new PIXI.Graphics();
        this.hitBox.lineStyle(4, 0xf00f00, 0.6);
        this.hitBox.drawRect(-16, -16, 32, 32);
        this.hitBox.rotation = -this.rotation;

        this.addChild(this.hitBox);
    }

}
