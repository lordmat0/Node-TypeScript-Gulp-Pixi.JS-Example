import {ScoreBoardContainer} from './container/score-board.container';
import {CollisionDetail} from '../../shared/collision-detail';
import {BulletMovement} from '../../shared/bullet-movement';
import {EnemyContainer} from './container/enemy.container';
import {StarContainer} from './container/star.container';
import {BulletContainer} from './container/bullet.container';
import {WorldContainer} from './container/world.container';
import {PlayerContainer} from './container/player.container';
import {RenderDetails} from '../../shared/render-details';
import {PlayerMovement} from '../../shared/player-movement';

export class Game {

    private playerContainer: PlayerContainer;
    private enemyContainer: EnemyContainer;
    private worldContainer: WorldContainer;
    private bulletContainer: BulletContainer;
    private starContainer: StarContainer;
    private scoreBoardContainer: ScoreBoardContainer;

    private socket: SocketIOClient.Socket;

    constructor(private renderDetails: RenderDetails) {
        this.initSocket();
        this.initContainers();
        this.initEvents();
        this.initWorldContainer();
    }

    state(): void {
        this.playerContainer.tick();

        this.worldContainer.tick();

        this.bulletContainer.tick();

        this.scoreBoardContainer.tick();
    }

    get stage(): PIXI.Container {
        return this.worldContainer;
    }

    private initSocket(): void {
        this.socket = io();
    }

    private initContainers(): void {

        this.worldContainer = new WorldContainer(this.renderDetails);
        this.playerContainer = new PlayerContainer(this.renderDetails, this.socket);
        this.scoreBoardContainer = new ScoreBoardContainer(this.renderDetails, this.socket);
        this.enemyContainer = new EnemyContainer(this.socket);
        this.bulletContainer = new BulletContainer(this.renderDetails, this.socket);
        this.starContainer = new StarContainer(this.renderDetails);
    }

    private initEvents(): void {
        this.playerContainer.on(this.playerContainer.onMove, (movement: PlayerMovement) => {
            this.worldContainer.scaleOut(movement);
            this.scoreBoardContainer.move(movement.x, movement.y);
        });

        this.playerContainer.on(this.playerContainer.onShot, (bullet: BulletMovement) => {
            this.bulletContainer.createBullet(bullet);
        });

        this.bulletContainer.on(this.bulletContainer.onTick, (bullets: CollisionDetail[]) => {
            this.playerContainer.handleHits(bullets);
        });
    }

    private initWorldContainer(): void {
        this.worldContainer.addChild(this.starContainer);
        this.worldContainer.addChild(this.playerContainer);
        this.worldContainer.addChild(this.enemyContainer);
        this.worldContainer.addChild(this.bulletContainer);
        this.worldContainer.addChild(this.scoreBoardContainer);
    }

}
