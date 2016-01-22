import {EnemyGraphic} from './graphics/enemy.graphic';
import {PlayerCameraContainer} from './container/player-camera.container';
import {PlayerGraphic} from './graphics/player.graphic';
import {PlayerMovement} from '../../shared/player-movement';
import {StarGraphic} from './graphics/star.graphic';
import {Random} from './util/random';
import {BulletContainer} from './container/bullet.container';

import * as io from 'socket.io-client';

export class Game {

    playerContainer: PlayerCameraContainer;
    baseContainer: PIXI.Container;
    private bulletContainer: BulletContainer;

    private socket: SocketIOClient.Socket;

    private playerGraphic: PlayerGraphic;
    private otherPlayerGraphics: { [id: string]: EnemyGraphic } = {};

    private lastMovement: PlayerMovement = {
        x: -1,
        y: -1
    };

    init(): void {
        this.baseContainer = new PIXI.Container();
        this.playerContainer = new PlayerCameraContainer();

        this.playerGraphic = new PlayerGraphic();
        this.bulletContainer = new BulletContainer();

        this.initSocket();
        this.initStars();

        this.baseContainer.addChild(this.playerContainer);
        this.playerContainer.addChild(this.playerGraphic);
        this.baseContainer.addChild(this.bulletContainer);
    }


    state(): void {
        let movement = this.playerGraphic.getMovementInfo();

        if (this.lastMovement.x !== movement.x || this.lastMovement.y !== movement.y || this.lastMovement.rotation !== movement.rotation) {
            this.socket.emit('player-movement', movement);
        }

        if (this.playerGraphic.isShooting()) {
            let bulletInfo = this.playerGraphic.getBulletInfo();
            this.bulletContainer.addBullet(bulletInfo);
        }

        this.bulletContainer.tick();

        this.lastMovement = movement;
    }

    get stage(): PIXI.Container {
        return this.baseContainer;
    }

    private initSocket(): void {
        let otherSquares = this.otherPlayerGraphics;

        this.socket = io();

        this.socket.on('new-square', (square: PlayerMovement) => {
            let squareGraphic = new EnemyGraphic();
            squareGraphic.x = square.x;
            squareGraphic.y = square.y;
            squareGraphic.rotation = square.rotation;
            squareGraphic.id = square.id;

            otherSquares[square.id] = squareGraphic;
            this.baseContainer.addChild(squareGraphic);
        });

        this.socket.on('square-moved', (square: PlayerMovement) => {
            let squareGraphic = otherSquares[square.id];

            if (squareGraphic) {
                squareGraphic.x = square.x;
                squareGraphic.y = square.y;
                squareGraphic.rotation = square.rotation;
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
                    let squareGraphic = new EnemyGraphic();
                    squareGraphic.x = squares[id].x;
                    squareGraphic.y = squares[id].y;
                    squareGraphic.rotation = squares[id].rotation;
                    squareGraphic.id = id;

                    this.baseContainer.addChild(squareGraphic);

                    otherSquares[squares[id].id] = squareGraphic;
                }
            }

        });
    }

    private initStars(): void {
        // TODO move into a container

        for (let i = 0; i < 8; i++) {
            for (let k = 0; k < 8; k++) {
                let x = Random.getInt(i * 62, 62 + i * 62);
                let y = Random.getInt(k * 62, 62 + k * 62);
                this.baseContainer.addChild(new StarGraphic(x, y));
            }
        }
    }
}
