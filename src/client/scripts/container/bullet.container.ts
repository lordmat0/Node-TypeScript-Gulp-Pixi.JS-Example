import {RenderDetails} from '../../../shared/render-details';
import {CollisionDetail} from '../../../shared/collision-detail';
import {BulletGraphic} from '../graphics/bullet.graphic';
import {BulletMovement} from '../../../shared/bullet-movement';
import {BulletPhysics} from '../physics/bullet.physics';

export class BulletContainer extends PIXI.Container {
    onTick = 'onTick';

    private bulletPhysics: BulletPhysics;

    private MIN_X = 0;
    private MIN_Y = 0;

    constructor(private renderDetails: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initSocket();
        this.bulletPhysics = new BulletPhysics();
    }

    tick(): void {
        let bullets: CollisionDetail[] = [];
        for (let i in this.children) {
            if (this.children.hasOwnProperty(i)) {
                let bulletGraphic = <BulletGraphic>this.children[i];
                let bulletMovement = this.bulletPhysics.calculateBullet(bulletGraphic.x, bulletGraphic.y, bulletGraphic.rotation);

                if (this.inBounds(bulletMovement)) {
                    bulletGraphic.x = bulletMovement.x;
                    bulletGraphic.y = bulletMovement.y;
                    bulletGraphic.rotation = bulletMovement.rotation;

                    let collisionDetail = <CollisionDetail>bulletMovement;
                    collisionDetail.name = bulletGraphic.originId;
                    collisionDetail.height = bulletGraphic.height;
                    collisionDetail.width = bulletGraphic.width;
                    bullets.push(collisionDetail);

                } else {
                    // should this really do this? maybe the server should check instead
                    // this.socket.emit('bullet-deleted', bulletMovement);
                    this.removeChild(bulletGraphic);
                }
            }
        }

        // emit bullets
        this.emit(this.onTick, bullets);
    }

    createBullet(bulletMovement: BulletMovement): void {
        this.addBullet(bulletMovement);
        this.socket.emit('bullet-create', bulletMovement);
    }

    addBullet(bulletMovement: BulletMovement): void {
        let x = bulletMovement.x;
        let y = bulletMovement.y;
        let rotation = bulletMovement.rotation;
        let originId = bulletMovement.originId;
        this.addChild(new BulletGraphic(x, y, rotation, originId));
    }

    private inBounds(bulletMovement: BulletMovement): boolean {
        return bulletMovement.x > this.MIN_X &&
            bulletMovement.x < this.renderDetails.stageMaxWidth &&
            bulletMovement.y > this.MIN_Y &&
            bulletMovement.y < this.renderDetails.stageMaxHeight;
    }

    private addBullets(bullets: BulletMovement[]): void {
        this.children = [];

        for (let i in bullets) {
            if (bullets.hasOwnProperty(i)) {
                this.addBullet(bullets[i]);
            }
        }
    }

    private moveBullet(bullet: BulletMovement): void {
        // todo
    }

    private removeBullet(name: string): void {
        this.removeChild(this.getChildByName(name));
    }

    private initSocket(): void {
        this.socket.on('bullet-create', this.addBullet.bind(this));
        this.socket.on('bullet-list', this.addBullets.bind(this));
        this.socket.on('bullet-deleted', this.removeBullet.bind(this));
        this.socket.on('bullet-add', this.addBullet.bind(this));
    }

}
