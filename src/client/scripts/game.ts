import {Rectangle} from './graphics/rectangle';

export class Game {
    
    baseContainer: PIXI.Container;    

    private rectangle: Rectangle;

    init() {
        this.rectangle = new Rectangle();

        this.baseContainer = new PIXI.Container();
        this.baseContainer.addChild(this.rectangle);
    }

    state() {
        this.rectangle.x++;
    }

    get stage(): PIXI.Container {
        return this.baseContainer;
    }
}
