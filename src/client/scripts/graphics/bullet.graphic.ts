
export class BulletGraphic extends PIXI.Graphics {

    private SIZE = 5;

    constructor(public x: number, public y: number, public rotation: number) {
        super();
        this.init();
    }

    private init(): void {
        let bulletColor = 0xffff00;
        let size = this.SIZE;

        this.beginFill(bulletColor);
        this.drawRect(0, 0, size, size);
        this.endFill();
    }
}
