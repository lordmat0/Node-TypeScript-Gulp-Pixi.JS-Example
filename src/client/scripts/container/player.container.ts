import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerMovement} from '../../../shared/player-movement';


export class PlayerContainer extends PIXI.Container {

    private playerMovementPhysics: PlayerMovementPhysics;

    constructor() {
        super();
        this.playerMovementPhysics = new PlayerMovementPhysics();

        // TODO move this out to the game
        this.x = 128;
        this.y = 128;
    }

    getMovementInfo(): PlayerMovement {
        let playerMovement = this.playerMovementPhysics.calculate(this.x, this.y, this.rotation);
        this.x = playerMovement.x;
        this.y = playerMovement.y;
        this.rotation = playerMovement.rotation;

        return playerMovement;
    }

}
