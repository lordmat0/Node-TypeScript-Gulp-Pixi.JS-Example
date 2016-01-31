export class RenderDetails {
    private x = 512;
    private y = 512;

    private stageWidthSize = 1000;
    private stageHeightSize = 1000;

    get width(): number {
        return this.x;
    }

    get height(): number {
        return this.y;
    }

    get halfWidth(): number {
        return this.x / 2;
    }

    get halfHeight(): number {
        return this.y / 2;
    }

    get stageWidth() {
        return this.stageWidthSize;
    }

    get stageHeight() {
        return this.stageHeightSize;
    }
}
