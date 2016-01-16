
export class StarGraphic extends PIXI.Graphics {

    private squareSize = 4;

    // constructor() {
    constructor(public x: number, public y: number) {
        super();
        this.init();
    }

    private init(): void {
        let starColor = 0xf2f2f2;
        let outlineColor = 0xe6e6e6;
        let outlineAlpha = 0.6;
        let squareSize = this.squareSize;
        let x = this.x;
        let y = this.y;

        this.beginFill(starColor);

        // Middle square
        this.drawRect(x, y, squareSize, squareSize);
        this.endFill();

        this.beginFill(outlineColor);
        this.fillAlpha = outlineAlpha;

        // Four squares surrounding the middle square
        this.drawRect(x - squareSize, y, squareSize, squareSize);
        this.drawRect(x, y - squareSize, squareSize, squareSize);
        this.drawRect(x + squareSize, y, squareSize, squareSize);
        this.drawRect(x, y + squareSize, squareSize, squareSize);
        this.endFill();
    }

}
