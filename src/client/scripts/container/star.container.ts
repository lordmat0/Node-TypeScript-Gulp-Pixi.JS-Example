import {RenderDetails} from '../../../shared/render-details';
import {StarGraphic} from '../graphics/star.graphic';
import {Random} from '../../../shared/util/random';

export class StarContainer extends PIXI.Container {
    constructor(private renderDetails: RenderDetails) {
        super();
        this.initStars();
    }

    private initStars(): void {
        let xStars = this.renderDetails.stageMaxWidth / 8;
        let yStars = this.renderDetails.stageMaxHeight / 8;

        for (let i = 0; i < 8; i++) {
            for (let k = 0; k < 8; k++) {
                let x = Random.getInt(i * xStars, xStars + i * xStars);
                let y = Random.getInt(k * yStars, yStars + k * yStars);
                this.addChild(new StarGraphic(x, y));
            }
        }
    }
}
