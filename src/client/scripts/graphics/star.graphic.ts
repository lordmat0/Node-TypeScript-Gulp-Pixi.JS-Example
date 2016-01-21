
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

        this.beginFill(starColor);

        // Middle square
        this.drawRect(squareSize, squareSize, squareSize, squareSize);
        this.endFill();

        this.beginFill(outlineColor);
        this.fillAlpha = outlineAlpha;

        // Four squares surrounding the middle square
        this.drawRect(0, squareSize, squareSize, squareSize);
        this.drawRect(squareSize, 0, squareSize, squareSize);
        this.drawRect(squareSize + squareSize, squareSize, squareSize, squareSize);
        this.drawRect(squareSize, squareSize + squareSize, squareSize, squareSize);
        this.endFill();
    }

}
