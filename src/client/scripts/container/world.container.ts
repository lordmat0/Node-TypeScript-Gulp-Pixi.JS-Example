import {RenderDetails} from '../../../shared/render-details';
import {PlayerMovement} from '../../../shared/player-movement';
import {ZoomPhysics} from '../physics/zoom.physics';

export class WorldContainer extends PIXI.Container {

    private lastMovement: PlayerMovement;
    private zoomPhysics: ZoomPhysics;
    private didZoom = false;

    constructor(public renderDetails: RenderDetails) {
        super();
        this.zoomPhysics = new ZoomPhysics(0.7);
    }

    tick(): void {
        if (!this.didZoom) {
            this.scaleIn();
        }
        this.didZoom = false;
    }

    scaleIn(): void {
        this.scale = this.zoomPhysics.scaleIn(this.scale);

        if (this.lastMovement) {
            this.x = -this.lastMovement.x * this.scale.x + this.renderDetails.halfWidth;
            this.y = -this.lastMovement.y * this.scale.y + this.renderDetails.halfHeight;
        }
    }

    scaleOut(movement: PlayerMovement): void {
        this.scale = this.zoomPhysics.scaleOut(this.scale);

        this.x = -movement.x * this.scale.x + this.renderDetails.halfWidth;
        this.y = -movement.y * this.scale.y + this.renderDetails.halfHeight;

        this.didZoom = true;
        this.lastMovement = movement;
    }
}
