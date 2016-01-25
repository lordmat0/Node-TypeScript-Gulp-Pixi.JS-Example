import {BulletMovement} from '../../../shared/bullet-movement';
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

    constructor(private renderDetails: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();

        this.playerMovementPhysics = new PlayerMovementPhysics();
        this.bulletPhysics = new BulletPhysics();

        this.playerGraphic = new PlayerGraphic();

        this.x = renderDetails.halfWidth;
        this.y = renderDetails.halfHeight;

        this.addChild(this.playerGraphic);
    }

    tick(): void {
        this.getMovementInfo();
        this.getBulletInfo();
    }

    handleHits(bullets: BulletMovement[]) {
        // console.log(bullets);
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
            this.emit(this.onMove, playerMovement);
        }
    }

    private hasMoved(movement: PlayerMovement): boolean {
        return this.x !== movement.x || this.y !== movement.y || this.rotation !== movement.rotation;
    }

    private initSocket() {
        this.on(this.onMove, this.socket.emit.bind(this.socket, 'player-movement'));
    }

}
