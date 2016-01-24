import {EnemyGraphic} from '../graphics/enemy.graphic';
import {PlayerMovement} from '../../../shared/player-movement';
import * as io from 'socket.io-client';

export class EnemyContainer extends PIXI.Container {

    constructor(private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();
    }

    addEnemy(player: PlayerMovement): void {
        // TODO move this into the constructor for EnemyGraphic
        let squareGraphic = new EnemyGraphic();
        squareGraphic.x = player.x;
        squareGraphic.y = player.y;
        squareGraphic.rotation = player.rotation;
        squareGraphic.name = player.name;

        this.addChild(squareGraphic);
    }

    addEnemys(players: PlayerMovement[]): void {
        // TODO remove enemys before adding any
        // TODO update typings tsd to be an object hashmap rather than an array
        // players.forEach((player: PlayerMovement) => this.addEnemy(player));

        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                this.addEnemy(players[i]);
            }
        }
    }

    moveEnemy(player: PlayerMovement): void {
        let enemyGraphic = <EnemyGraphic>this.getChildByName(player.name);
        enemyGraphic.x = player.x;
        enemyGraphic.y = player.y;
        enemyGraphic.rotation = player.rotation;
    }


    private initSocket(): void {

        this.socket.on('new-square', this.addEnemy.bind(this));
        this.socket.on('square-list', this.addEnemys.bind(this));
        this.socket.on('square-deleted', this.removeChild.bind(this));
        this.socket.on('square-moved', this.moveEnemy.bind(this));
    }
}
