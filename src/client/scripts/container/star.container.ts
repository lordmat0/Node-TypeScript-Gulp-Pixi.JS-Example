import {StarGraphic} from '../graphics/star.graphic';
import {Random} from '../util/random';

export class StarContainer extends PIXI.Container {
    constructor(public xStars = 62, public yStars = 62) {
        super();
        this.initStars();
    }

    private initStars(): void {

        for (let i = 0; i < 8; i++) {
            for (let k = 0; k < 8; k++) {
                let x = Random.getInt(i * this.xStars, this.xStars + i * this.xStars);
                let y = Random.getInt(k * this.yStars, this.yStars + k * this.yStars);
                this.addChild(new StarGraphic(x, y));
            }
        }
    }
}
