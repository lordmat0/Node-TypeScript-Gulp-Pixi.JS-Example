export class EnemyGraphic extends PIXI.Graphics {

    private SIZE = 32;

    constructor(public x: number, public y: number,
        public rotation: number, public name: string) {

        super();
        this.initShape();
    }

    private initShape(): void {
        this.pivot = new PIXI.Point(this.SIZE / 2, this.SIZE / 2);

        let lineStyle = 0xFF3300;
        let fillColor = 0x66CCFF;

        this.lineStyle(4, lineStyle, 1);

        // Body
        this.beginFill(fillColor);
        this.drawRect(0, 0, this.SIZE, this.SIZE);
        this.endFill();

        // Top wing
        this.moveTo(0, 0);
        this.lineTo(-1, -32);
        this.lineTo(32, 0);
        this.endFill();

        // Bottom wing
        this.moveTo(0, this.SIZE);
        this.lineTo(-1, 32 + this.SIZE);
        this.lineTo(this.SIZE, this.SIZE);
        this.endFill();
    }

}
