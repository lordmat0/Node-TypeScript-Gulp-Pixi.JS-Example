import {CollisionDetail} from '../../../shared/collision-details';
import {BulletGraphic} from '../graphics/bullet.graphic';
import {BulletMovement} from '../../../shared/bullet-movement';
import {BulletPhysics} from '../physics/bullet.physics';

export class BulletContainer extends PIXI.Container {
    onTick = 'onTick';

    private bulletPhysics: BulletPhysics;

    private MIN_X = -1000;
    private MIN_Y = -1000;
    private MAX_X = 1000;
    private MAX_Y = 1000;

    constructor(private socket: SocketIOClient.Socket) {
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
                    bullets.push({
                        bulletMovement,
                        height: bulletGraphic.height,
                        width: bulletGraphic.width
                    });

                } else {
                    // should this really do this? maybe the server should check instead
                    // this.socket.emit('bullet-deleted', bulletMovement);
                    this.removeChild(bulletGraphic);
                }
            }
        }
        // Remove bullets that are out of bounds


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
        this.addChild(new BulletGraphic(x, y, rotation));
    }

    private inBounds(bulletMovement: BulletMovement): boolean {
        return bulletMovement.x > this.MIN_X &&
            bulletMovement.x < this.MAX_X &&
            bulletMovement.y > this.MIN_Y &&
            bulletMovement.y < this.MAX_Y;
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

    // private outOfBounds(bullet: BulletGraphic): boolean {
    //     return false;
    // }

    private initSocket(): void {
        this.socket.on('bullet-create', this.addBullet.bind(this));
        this.socket.on('bullet-list', this.addBullets.bind(this));
        this.socket.on('bullet-deleted', this.removeBullet.bind(this));
        this.socket.on('bullet-add', this.addBullet.bind(this));
    }

}
