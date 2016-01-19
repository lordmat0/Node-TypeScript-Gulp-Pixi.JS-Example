
export class BulletGraphic extends PIXI.Graphics {

    private SIZE = 5;

    constructor(public x: number, public y: number) {
        super();
        this.init();
    }

    private init(): void {
        let bulletColor = 0xffff00;
        let x = this.x;
        let y = this.y;
        let size = this.SIZE;

        this.beginFill(bulletColor);
        this.drawRect(x, y, size, size);
    }
}
