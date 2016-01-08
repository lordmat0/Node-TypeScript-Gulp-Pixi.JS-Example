export class Rectangle extends PIXI.Graphics {
    constructor() {
        super();
        this.lineStyle(4, 0xFF3300, 1);
        this.beginFill(0x66CCFF);
        this.drawRect(0, 0, 32, 32);
        this.endFill();
        this.x = 170;
        this.y = 170;
    }
}
