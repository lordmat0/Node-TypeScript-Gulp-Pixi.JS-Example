import {ZoomPhysics} from '../physics/zoom.physics';

export class WorldContainer extends PIXI.Container {

    private zoomPhysics: ZoomPhysics;

    constructor() {
        super();
        this.zoomPhysics = new ZoomPhysics(0.7);
    }

    scaleIn() {
        this.scale = this.zoomPhysics.scaleIn(this.scale);
    }

    scaleOut() {
        this.scale = this.zoomPhysics.scaleOut(this.scale);
    }

    getScale() {
        return this.scale.x;
    }
}
