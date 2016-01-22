import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerMovement} from '../../../shared/player-movement';


export class PlayerCameraContainer extends PIXI.Container {

    private playerMovementPhysics: PlayerMovementPhysics;

    constructor() {
        super();
        this.playerMovementPhysics = new PlayerMovementPhysics();

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
