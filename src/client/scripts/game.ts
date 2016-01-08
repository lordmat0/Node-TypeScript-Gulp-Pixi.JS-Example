import {Rectangle} from './graphics/rectangle';

export class Game {
    
    private rectangle = new Rectangle();
    baseContainer = new PIXI.Container();
    
    init() {
        this.baseContainer.addChild(this.rectangle);
    }

    state() {
        this.rectangle.x++;
    }
    
    get stage(){
        return this.baseContainer;
    }
}
