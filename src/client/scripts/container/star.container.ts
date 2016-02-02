import {RenderDetails} from '../../../shared/render-details';
import {StarGraphic} from '../graphics/star.graphic';
import {Random} from '../../../shared/util/random';

export class StarContainer extends PIXI.Container {
    constructor(private renderDetails: RenderDetails) {
        super();
        this.initStars();
    }

    private initStars(): void {
        let starDensity = 35;
        let xStars = this.renderDetails.stageMaxWidth / starDensity;
        let yStars = this.renderDetails.stageMaxHeight / starDensity;

        for (let i = 0; i < starDensity; i++) {
            for (let k = 0; k < starDensity; k++) {
                let x = Random.getInt(i * xStars, xStars + i * xStars);
                let y = Random.getInt(k * yStars, yStars + k * yStars);
                this.addChild(new StarGraphic(x, y));
            }
        }
    }
}
