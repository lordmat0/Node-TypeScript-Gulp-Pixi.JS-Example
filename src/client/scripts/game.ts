import {EnemyContainer} from './container/enemy.container';
import {StarContainer} from './container/star.container';
import {RenderDetails} from './render-details';
import {WorldContainer} from './container/world.container';
import {EnemyGraphic} from './graphics/enemy.graphic';
import {PlayerContainer} from './container/player.container';
import {PlayerMovement} from '../../shared/player-movement';
import {BulletContainer} from './container/bullet.container';

import * as io from 'socket.io-client';

export class Game {

    private playerContainer: PlayerContainer;
    private enemyContainer: EnemyContainer;
    private worldContainer: WorldContainer;
    private bulletContainer: BulletContainer;
    private starContainer: StarContainer;

    private socket: SocketIOClient.Socket;

    private otherPlayerGraphics: { [name: string]: EnemyGraphic } = {};

    constructor(private renderDetails: RenderDetails) {
        this.initContainers();
        // this.initSocket();
        this.initEvents();
        this.initNestedContainers();
    }

    state(): void {

        this.playerContainer.tick();

        this.worldContainer.tick();


        // if (this.playerGraphic.isShooting()) {
        //     let bulletInfo = this.playerGraphic.getBulletInfo();
        //     this.bulletContainer.addBullet(bulletInfo);
        // }

        this.bulletContainer.tick();
    }

    get stage(): PIXI.Container {
        return this.worldContainer;
    }

    private initContainers(): void {

        this.worldContainer = new WorldContainer(this.renderDetails);
        this.playerContainer = new PlayerContainer(this.renderDetails);
        this.enemyContainer = new EnemyContainer();
        this.bulletContainer = new BulletContainer();
        this.starContainer = new StarContainer();
    }

    private initEvents(): void {
        this.playerContainer.on(this.playerContainer.onMove, (movement: PlayerMovement) => {
            this.worldContainer.scaleOut(movement);
        });
    }

    private initNestedContainers(): void {
        this.worldContainer.addChild(this.starContainer);
        this.worldContainer.addChild(this.playerContainer);
        this.worldContainer.addChild(this.enemyContainer);
        this.worldContainer.addChild(this.bulletContainer);
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
