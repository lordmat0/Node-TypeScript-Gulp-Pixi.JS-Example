export class RenderDetails {
    x: number = 512;
    y: number = 512;

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
}
