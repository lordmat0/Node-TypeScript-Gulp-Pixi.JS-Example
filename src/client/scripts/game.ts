import {Rectangle} from './graphics/rectangle';
import {Movement} from '../../shared/movement';
import * as io from 'socket.io-client';

export class Game {

    baseContainer: PIXI.Container;

    private rectangle: Rectangle;
    private socket: SocketIOClient.Socket;
    private lastMovement: Movement = {
        x: -1,
        y: -1
    };

    init() {
        this.socket = io();

        this.rectangle = new Rectangle(true);

        this.baseContainer = new PIXI.Container();
        this.baseContainer.addChild(this.rectangle);
    }

    state() {
        this.rectangle.x += this.rectangle.vx;
        this.rectangle.y += this.rectangle.vy;

        let movement: Movement = {
            x: this.rectangle.x,
            y: this.rectangle.y
        };

        if (this.lastMovement.x !== movement.x || this.lastMovement.y !== movement.y) {
            this.socket.emit('movement', movement);
        }

        this.lastMovement = movement;
    }

    get stage(): PIXI.Container {
        return this.baseContainer;
    }
}
