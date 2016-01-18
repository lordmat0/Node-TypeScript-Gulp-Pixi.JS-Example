import {PlayerMovement} from '../../../shared/player-movement';
import {PlayerMovementPhysics} from '../physics/player-movement.physics';

export class PlayerGraphic extends PIXI.Graphics {

    id: string;
    private SIZE = 32;
    private playerMovementPhysics: PlayerMovementPhysics;


    constructor(public player = false) {
        super();
        this.initShape();
        if (player) {
            this.playerMovementPhysics = new PlayerMovementPhysics();
        }
    }

    getMovementInfo(): PlayerMovement {
        let playerMovement = this.playerMovementPhysics.calculateMovement(this.x, this.y, this.rotation);
        this.x = playerMovement.x;
        this.y = playerMovement.y;
        this.rotation = playerMovement.rotation;

        return playerMovement;
    }


    private initShape(): void {
        this.pivot = new PIXI.Point(this.SIZE / 2, this.SIZE / 2);

        let lineStyle = 0xFF3300;
        let fillColor = 0x66CCFF;
        if (this.player) {
            lineStyle = 0x66CCFF;
            fillColor = 0x7F9A65;
        }

        this.lineStyle(4, lineStyle, 1);
        this.beginFill(fillColor);

        this.drawRect(0, 0, this.SIZE, this.SIZE);
        this.endFill();
        this.x = 170;
        this.y = 170;
    }

}
