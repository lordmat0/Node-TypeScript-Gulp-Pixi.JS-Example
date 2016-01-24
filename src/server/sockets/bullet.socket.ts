import {PlayerBulletMap} from '../../shared/player-bullet-map';
import {BulletMovement} from '../../shared/bullet-movement';

class BulletSocket {

    private static bullets: PlayerBulletMap = {};

    constructor(private socket: SocketIO.Socket) {
        this.initSocket();
        this.initEvents();
    }

    private bulletMovement(movement: BulletMovement) {
        BulletSocket.bullets[this.socket.id][movement.id] = movement;

        console.log(movement, 'bullet-moved');
        this.socket.broadcast.emit('bullet-moved', movement);
    }

    private bulletCreate(movement: BulletMovement) {
        BulletSocket.bullets[this.socket.id][movement.id] = movement;
        this.socket.broadcast.emit('bullet-add', movement);
    }

    private bulletDeleted(movement: BulletMovement) {
        delete BulletSocket.bullets[this.socket.id][movement.id];
    }

    private disconnect(): void {
        console.log(this.socket.id, 'disconnect');
        this.socket.broadcast.emit('bullet-deleted', this.socket.id);

        delete BulletSocket.bullets[this.socket.id];
    }

    private initSocket(): void {
        // New bullet entry
        BulletSocket.bullets[this.socket.id] = {};

        console.log(this.socket.id, 'bullet-connection');

        this.socket.broadcast.emit('bullet-list', BulletSocket.bullets);
    }

    private initEvents(): void {
        this.socket.on('bullet-create', this.bulletCreate.bind(this));
        this.socket.on('bullet-deleted', this.bulletDeleted.bind(this));
        this.socket.on('bullet-movement', this.bulletMovement.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }
}

export default BulletSocket;
