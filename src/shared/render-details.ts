export class RenderDetails {
    private x = 512;
    private y = 512;

    private stageWidthSize = 5000;
    private stageHeightSize = 5000;

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

    get stageMinWidth() {
        return 0;
    }

    get stageMaxWidth() {
        return this.stageWidthSize;
    }

    get stageMinHeight() {
        return 0;
    }

    get stageMaxHeight() {
        return this.stageHeightSize;
    }
}
