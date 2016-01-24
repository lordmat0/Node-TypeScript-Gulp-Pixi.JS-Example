import {RenderDetails} from '../render-details';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';
import {PlayerGraphic} from '../graphics/player.graphic';
import {PlayerMovement} from '../../../shared/player-movement';

import * as io from 'socket.io-client';


export class PlayerContainer extends PIXI.Container {
    onMove = 'on-move';

    private playerMovementPhysics: PlayerMovementPhysics;
    private playerGraphic: PlayerGraphic;
    private socket: SocketIOClient.Socket;

    constructor(public renderDetails: RenderDetails) {
        super();
        this.playerMovementPhysics = new PlayerMovementPhysics();
        this.playerGraphic = new PlayerGraphic();

        this.x = renderDetails.halfWidth;
        this.y = renderDetails.halfHeight;

        this.addChild(this.playerGraphic);
        this.socket = io();
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
            this.socket.emit('player-movement', playerMovement);

        }

        return playerMovement;
    }

}
