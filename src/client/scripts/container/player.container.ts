import {RenderDetails} from '../render-details';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerMovement} from '../../../shared/player-movement';


export class PlayerContainer extends PIXI.Container {
    onMove = 'on-move';

    private playerMovementPhysics: PlayerMovementPhysics;

    constructor(public renderDetails: RenderDetails) {
        super();
        this.playerMovementPhysics = new PlayerMovementPhysics();

        // TODO move this out to the game
        this.x = renderDetails.halfWidth;
        this.y = renderDetails.halfHeight;
    }

    tick(): void {
        this.getMovementInfo();
    }

    getMovementInfo(): PlayerMovement {
        let playerMovement = this.playerMovementPhysics.calculate(this.x, this.y, this.rotation);

        if (this.x !== playerMovement.x || this.y !== playerMovement.y || this.rotation !== playerMovement.rotation) {
            this.x = playerMovement.x;
            this.y = playerMovement.y;
            this.rotation = playerMovement.rotation;
            this.emit(this.onMove, playerMovement);
        }

        return playerMovement;
    }

}
