export class RenderDetails {
    private screenWidth: number;
    private screenHeight: number;

    private stageWidthSize = 5000;
    private stageHeightSize = 5000;

    constructor() {
        try {
            // Window is undefined on node
            this.screenWidth = window && window.innerWidth || 500;
            this.screenHeight = window && window.innerHeight || 500;
        } catch (_) {
            this.screenWidth = 500;
            this.screenHeight = 500;
        }
    }

    get width(): number {
        return this.screenWidth;
    }

    get height(): number {
        return this.screenHeight;
    }

    get halfWidth(): number {
        return this.screenWidth / 2;
    }

    get halfHeight(): number {
        return this.screenHeight / 2;
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
