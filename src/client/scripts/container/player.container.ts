import {RenderDetails} from '../render-details';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerGraphic} from '../graphics/player.graphic';
import {PlayerMovement} from '../../../shared/player-movement';

export class PlayerContainer extends PIXI.Container {
    onMove = 'on-move';

    private playerMovementPhysics: PlayerMovementPhysics;
    private playerGraphic: PlayerGraphic;

    constructor(private renderDetails: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();

        this.playerMovementPhysics = new PlayerMovementPhysics();
        this.playerGraphic = new PlayerGraphic();

        this.x = renderDetails.halfWidth;
        this.y = renderDetails.halfHeight;

        this.addChild(this.playerGraphic);
    }

    tick(): void {
        this.getMovementInfo();
    }

    getMovementInfo(): PlayerMovement {
        let playerMovement = this.playerMovementPhysics.calculate(this.x, this.y, this.rotation);

        if (this.hasMoved(playerMovement)) {
            this.x = playerMovement.x;
            this.y = playerMovement.y;
            this.rotation = playerMovement.rotation;
            this.emit(this.onMove, playerMovement);
        }

        return playerMovement;
    }

    private hasMoved(movement: PlayerMovement): boolean {
        return this.x !== movement.x || this.y !== movement.y || this.rotation !== movement.rotation;
    }

    private initSocket() {
        this.on(this.onMove, this.socket.emit.bind(this.socket, 'player-movement'));
    }

}
