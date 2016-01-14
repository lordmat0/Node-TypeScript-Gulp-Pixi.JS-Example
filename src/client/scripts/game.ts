import {Square} from './graphics/square';
import {Movement} from '../../shared/movement';
import * as io from 'socket.io-client';

interface SquareMap {
    [name: string]: Square;
}

export class Game {

    baseContainer: PIXI.Container;

    private otherSquares: SquareMap = {};
    private playerSquare: Square;
    private socket: SocketIOClient.Socket;
    private lastMovement: Movement = {
        x: -1,
        y: -1
    };

    init() {
        this.socket = io();

        this.socket.on('new-square', (id: string) => {
            let square = new Square(false);
            square.x = -50;
            square.y = -50;
            square.id = id;

            this.otherSquares[id] = square;
            this.baseContainer.addChild(square);
        });

        this.socket.on('square-moved', (data: Movement) => {
            let square = this.otherSquares[data.id];

            console.log('otherSquares', this.otherSquares);

            if (square) {
                console.log('square', square.id, square.x, square.y);

                square.x = data.x;
                square.y = data.y;
            }
        });

        this.socket.on('square-deleted', (id: string) => {
            let square = this.otherSquares[id];
            if (square) {
                this.baseContainer.removeChild(square);
                delete this.otherSquares[id];
            }
        });

        this.playerSquare = new Square(true);

        this.baseContainer = new PIXI.Container();
        this.baseContainer.addChild(this.playerSquare);
    }

    state() {
        this.playerSquare.x += this.playerSquare.vx;
        this.playerSquare.y += this.playerSquare.vy;

        let movement: Movement = {
            x: this.playerSquare.x,
            y: this.playerSquare.y
        };

        if (this.lastMovement.x !== movement.x || this.lastMovement.y !== movement.y) {
            this.socket.emit('player-movement', movement);
        }

        this.lastMovement = movement;
    }

    get stage(): PIXI.Container {
        return this.baseContainer;
    }
}
