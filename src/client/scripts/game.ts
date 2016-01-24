import {EnemyContainer} from './container/enemy.container';
import {StarContainer} from './container/star.container';
import {BulletContainer} from './container/bullet.container';
import {WorldContainer} from './container/world.container';
import {PlayerContainer} from './container/player.container';
import {RenderDetails} from './render-details';
import {PlayerMovement} from '../../shared/player-movement';

export class Game {

    private playerContainer: PlayerContainer;
    private enemyContainer: EnemyContainer;
    private worldContainer: WorldContainer;
    private bulletContainer: BulletContainer;
    private starContainer: StarContainer;

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


        // if (this.playerGraphic.isShooting()) {
        //     let bulletInfo = this.playerGraphic.getBulletInfo();
        //     this.bulletContainer.addBullet(bulletInfo);
        // }

        this.bulletContainer.tick();
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
        this.enemyContainer = new EnemyContainer(this.socket);
        this.bulletContainer = new BulletContainer();
        this.starContainer = new StarContainer();
    }

    private initEvents(): void {
        this.playerContainer.on(this.playerContainer.onMove, (movement: PlayerMovement) => {
            this.worldContainer.scaleOut(movement);
        });
    }

    private initWorldContainer(): void {
        this.worldContainer.addChild(this.starContainer);
        this.worldContainer.addChild(this.playerContainer);
        this.worldContainer.addChild(this.enemyContainer);
        this.worldContainer.addChild(this.bulletContainer);
    }

}
