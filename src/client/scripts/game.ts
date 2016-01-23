import {StarContainer} from './container/star.container';
import {RenderDetails} from './render-details';
import {WorldContainer} from './container/world.container';
import {EnemyGraphic} from './graphics/enemy.graphic';
import {PlayerContainer} from './container/player.container';
import {PlayerGraphic} from './graphics/player.graphic';
import {PlayerMovement} from '../../shared/player-movement';
import {BulletContainer} from './container/bullet.container';

import * as io from 'socket.io-client';

export class Game {

    private playerContainer: PlayerContainer;
    private worldContainer: WorldContainer;
    private bulletContainer: BulletContainer;
    private starContainer: StarContainer;

    private socket: SocketIOClient.Socket;

    private playerGraphic: PlayerGraphic;
    private otherPlayerGraphics: { [name: string]: EnemyGraphic } = {};

    private lastMovement: PlayerMovement = {
        x: -1,
        y: -1
    };

    private renderDetails: RenderDetails;

    init(): void {
        this.worldContainer = new WorldContainer();
        this.playerContainer = new PlayerContainer();
        this.starContainer = new StarContainer();

        this.playerGraphic = new PlayerGraphic();
        this.bulletContainer = new BulletContainer();

        this.renderDetails = new RenderDetails();

        this.initSocket();

        this.playerGraphic.on('test', console.log.bind(console));

        this.playerGraphic.emit('test', 'test message');

        this.worldContainer.addChild(this.starContainer);
        this.worldContainer.addChild(this.playerContainer);
        this.worldContainer.addChild(this.bulletContainer);

        this.playerContainer.addChild(this.playerGraphic);
    }

    state(): void {
        let movement = this.playerContainer.getMovementInfo();

        if (this.lastMovement.x !== movement.x || this.lastMovement.y !== movement.y || this.lastMovement.rotation !== movement.rotation) {
            this.socket.emit('player-movement', movement);

            this.worldContainer.scaleOut();
            let scale = this.worldContainer.getScale();
            // Scale with movement
            this.worldContainer.x = -movement.x * scale + this.renderDetails.halfWidth;
            this.worldContainer.y = -movement.y * scale + this.renderDetails.halfHeight;
        } else {
            this.worldContainer.scaleIn();
            let scale = this.worldContainer.getScale();
            // Scale with movement
            this.worldContainer.x = -movement.x * scale + this.renderDetails.halfWidth;
            this.worldContainer.y = -movement.y * scale + this.renderDetails.halfHeight;
        }

        if (this.playerGraphic.isShooting()) {
            let bulletInfo = this.playerGraphic.getBulletInfo();
            this.bulletContainer.addBullet(bulletInfo);
        }

        this.bulletContainer.tick();

        this.lastMovement = movement;
    }

    get stage(): PIXI.Container {
        return this.worldContainer;
    }

    private initSocket(): void {
        let otherSquares = this.otherPlayerGraphics;

        this.socket = io();

        this.socket.on('new-square', (square: PlayerMovement) => {
            let squareGraphic = new EnemyGraphic();
            squareGraphic.x = square.x;
            squareGraphic.y = square.y;
            squareGraphic.rotation = square.rotation;
            squareGraphic.name = square.name;

            otherSquares[square.name] = squareGraphic;
            this.worldContainer.addChild(squareGraphic);
        });

        this.socket.on('square-moved', (square: PlayerMovement) => {
            let squareGraphic = otherSquares[square.name];

            if (squareGraphic) {
                squareGraphic.x = square.x;
                squareGraphic.y = square.y;
                squareGraphic.rotation = square.rotation;
            }
        });

        this.socket.on('square-deleted', (id: string) => {
            let square = otherSquares[id];
            if (square) {
                this.worldContainer.removeChild(square);
                delete otherSquares[id];
            }
        });

        this.socket.on('square-list', (squares: PlayerMovement[]) => {

            // Should be empty anyway, but just in case
            for (let i in otherSquares) {
                if (otherSquares.hasOwnProperty(i)) {
                    this.worldContainer.removeChild(otherSquares[i]);
                    delete otherSquares[i];
                }
            }

            for (let id in squares) {
                if (squares.hasOwnProperty(id)) {
                    let squareGraphic = new EnemyGraphic();
                    squareGraphic.x = squares[id].x;
                    squareGraphic.y = squares[id].y;
                    squareGraphic.rotation = squares[id].rotation;
                    squareGraphic.name = id;

                    this.worldContainer.addChild(squareGraphic);

                    otherSquares[squares[id].name] = squareGraphic;
                }
            }

        });
    }
}
