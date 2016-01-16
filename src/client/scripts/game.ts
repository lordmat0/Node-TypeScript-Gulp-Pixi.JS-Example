import {PlayerGraphic} from './graphics/player-graphic';
import {PlayerMovement} from '../../shared/player-movement';
import * as io from 'socket.io-client';

export class Game {

    baseContainer: PIXI.Container;

    private otherSquares: { [id: string]: PlayerGraphic } = {};
    private playerSquare: PlayerGraphic;
    private socket: SocketIOClient.Socket;
    private lastMovement: PlayerMovement = {
        x: -1,
        y: -1
    };

    init() {
        this.socket = io();

        let otherSquares = this.otherSquares;

        this.socket.on('new-square', (square: PlayerMovement) => {
            let squareGraphic = new PlayerGraphic(false);
            squareGraphic.x = square.x;
            squareGraphic.y = square.y;
            squareGraphic.id = square.id;

            otherSquares[square.id] = squareGraphic;
            this.baseContainer.addChild(squareGraphic);
        });

        this.socket.on('square-moved', (square: PlayerMovement) => {
            let squareGraphic = otherSquares[square.id];

            console.log('otherSquares', otherSquares);

            if (squareGraphic) {
                console.log('square', square.id, square.x, square.y);

                squareGraphic.x = square.x;
                squareGraphic.y = square.y;
            }
        });

        this.socket.on('square-deleted', (id: string) => {
            let square = otherSquares[id];
            if (square) {
                this.baseContainer.removeChild(square);
                delete otherSquares[id];
            }
        });

        this.socket.on('square-list', (squares: PlayerMovement[]) => {

            // Should be empty anyway, but just in case
            for (let i in otherSquares) {
                if (otherSquares.hasOwnProperty(i)) {
                    this.baseContainer.removeChild(otherSquares[i]);
                    delete otherSquares[i];
                }
            }

            for (let id in squares) {
                if (squares.hasOwnProperty(id)) {
                    let square = squares[id];
                    let squareGraphic = new PlayerGraphic(false);
                    squareGraphic.x = squares[id].x;
                    squareGraphic.y = squares[id].y;
                    squareGraphic.id = id;

                    this.baseContainer.addChild(squareGraphic);

                    otherSquares[square.id] = squareGraphic;
                }
            }

        });

        this.playerSquare = new PlayerGraphic(true);

        this.baseContainer = new PIXI.Container();
        this.baseContainer.addChild(this.playerSquare);
    }

    state() {
        this.playerSquare.x += this.playerSquare.vx;
        this.playerSquare.y += this.playerSquare.vy;

        let movement: PlayerMovement = {
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
