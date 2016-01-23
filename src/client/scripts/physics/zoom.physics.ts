
export class ZoomPhysics {

    private SCALE_OUT_MAX: number;
    private SCALE_IN_MAX: number;

    private SCALE_OUT_SPEED = 0.005;
    private SCALE_IN_SPEED = 0.001;

    constructor(private scaleOutMax: number) {
        this.SCALE_IN_MAX = 1;
        this.SCALE_OUT_MAX = scaleOutMax;
    }

    public scaleIn(point: PIXI.Point): PIXI.Point {
        if (point.x < this.SCALE_IN_MAX) {
            point.x += this.SCALE_IN_SPEED;
            point.y += this.SCALE_IN_SPEED;
        }

        return point;
    }

    public scaleOut(point: PIXI.Point): PIXI.Point {
        if (point.x > this.SCALE_OUT_MAX) {
            point.x -= this.SCALE_OUT_SPEED;
            point.y -= this.SCALE_OUT_SPEED;
        }

        return point;
    }

}
