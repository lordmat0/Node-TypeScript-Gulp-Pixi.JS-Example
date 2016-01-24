import {EnemyGraphic} from '../graphics/enemy.graphic';
import {PlayerMovement} from '../../../shared/player-movement';

export class EnemyContainer extends PIXI.Container {

    constructor(private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();
    }

    private addEnemy(player: PlayerMovement): void {
        this.addChild(new EnemyGraphic(player.x, player.y, player.rotation,
            player.name));
    }

    private addEnemys(players: PlayerMovement[]): void {
        this.children = [];

        console.log('enemys', players);

        for (let i in players) {
            if (players.hasOwnProperty(i)) {
                this.addEnemy(players[i]);
            }
        }
    }

    private moveEnemy(player: PlayerMovement): void {
        let enemyGraphic = <EnemyGraphic>this.getChildByName(player.name);
        enemyGraphic.x = player.x;
        enemyGraphic.y = player.y;
        enemyGraphic.rotation = player.rotation;
    }

    private removeEnemy(playerId: string): void {
        this.removeChild(this.getChildByName(playerId));
    }

    private initSocket(): void {
        this.socket.on('new-square', this.addEnemy.bind(this));
        this.socket.on('square-list', this.addEnemys.bind(this));
        this.socket.on('square-deleted', this.removeEnemy.bind(this));
        this.socket.on('square-moved', this.moveEnemy.bind(this));
    }
}
